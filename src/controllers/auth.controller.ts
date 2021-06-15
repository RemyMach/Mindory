import {ModelCtor, ValidationError, Sequelize, Op} from "sequelize";
import {UserAuthenticate, UserCreationProps, UserInstance} from "../models/user.model";
import {SessionInstance} from "../models/session.model";
import {SequelizeManager} from "../models";
import {compare} from "bcrypt";
import {Secret, sign, verify} from 'jsonwebtoken';
import { RoleInstance } from "../models/role.model";

export class AuthController {

    user: ModelCtor<UserInstance>;
    session: ModelCtor<SessionInstance>;
    role: ModelCtor<RoleInstance>;

    private static instance: AuthController;

    public static async getInstance(): Promise<AuthController> {
        if(AuthController.instance === undefined) {
            const {user, session, role} = await SequelizeManager.getInstance();
            AuthController.instance = new AuthController(user, session, role);
        }
        return AuthController.instance;
    }

    private constructor(user: ModelCtor<UserInstance>, session: ModelCtor<SessionInstance>, role: ModelCtor<RoleInstance>) {
        this.user = user;
        this.session = session;
        this.role = role;
    }

    public async subscribe(props: UserCreationProps): Promise<UserInstance> {

        const user = await this.user.create({
            ...props
        });

        const user_role = await this.role.findOne({
            where: {
                label: "user"
            }
        });

        if(user_role === null) {
            throw new Error("Role doesn't find");
        }
        await user.setRole(user_role);

        return user;
    }

    public async log(props: UserAuthenticate): Promise<SessionInstance | null> {

        await this.later(1000);
        const user = await this.user.findOne({
            where: {
                email: props.email
            }
        });
        if(user === null) {
            return null;
        }
        const isSamePassword = await compare(props.password, user.password);
        if(!isSamePassword) {
            return null;
        }
        const token = sign({ id: user.id.toString()}, process.env.JWT_SECRET as Secret);
        const session = await this.session.create({
            token
        });

        await session.setUser(user);
        return session;
    }

    public async deleteSession(token: string): Promise<void | null> {

        const authController = await AuthController.getInstance();
        try{
            await authController.session.destroy({
                where: {
                    token
                }
            });
        }catch(e) {
            return null;
        }
    }


    public async getSession(token: string): Promise<SessionInstance | null> {
        try{
            // TODO vérifié avec l id user décodé aussi
            const decoded = verify(token, process.env.JWT_SECRET as Secret)
            return await this.session.findOne({
                where: {
                    token
                }
            });
        }catch(e) {
            return null;
        }
    }

    public async getSpecificRoleSession(token: string, roles: string[]): Promise<SessionInstance | null> {
        try{
            const roles_formated = roles.map(role => {
                return {'label': role};
            })

            const session = await this.session.findOne({
                where: {
                    token
                },
                include: {
                    model: this.user,
                    include: [{
                        model: this.role,
                        where: {
                            [Op.or]: roles_formated
                        }
                    }],
                },
            });
            console.log(session)

            return session;
        }catch(e) {
            console.log(e)
            return null;
        }
    }

    private async later(delay: number): Promise<any> {
        return new Promise(function(resolve) {
            setTimeout(resolve, delay);
        });
    }

}
