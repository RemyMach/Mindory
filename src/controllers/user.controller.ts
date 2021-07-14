import {ModelCtor} from "sequelize";
import {UserInstance, UserUpdateOptions, UserUpdatePasswordOptions} from "../models/user.model";
import {SequelizeManager} from "../models";
import {RoleInstance} from "../models/role.model";
import {Secret, verify} from 'jsonwebtoken';
import {SessionInstance} from "../models/session.model";
import {UserRepository} from "../repositories/user.repository";
import {compare} from "bcrypt";

export class UserController {

    user: ModelCtor<UserInstance>;
    role: ModelCtor<RoleInstance>;
    session: ModelCtor<SessionInstance>;

    private static instance: UserController;

    public static async getInstance(): Promise<UserController> {
        if(UserController.instance === undefined) {
            const {user, role, session} = await SequelizeManager.getInstance();
            UserController.instance = new UserController(user, role, session);
        }
        return UserController.instance;
    }

    private constructor(user: ModelCtor<UserInstance>, role: ModelCtor<RoleInstance>, session: ModelCtor<SessionInstance>) {
        this.user = user;
        this.role = role;
        this.session = session;
    }

    public async getAll(offset: number | undefined, limit: number | undefined): Promise<UserInstance[]> {

        limit = limit || 30;
        offset = offset || 0;

        const res = await UserRepository.getAllUsers(offset, limit);

        if(res.length > 0) {
            return res;
        }


        return [];
    }

    public async getUser(token: string): Promise<UserInstance | null> {

        const decoded = verify(token, process.env.JWT_SECRET as Secret);

        const user = await UserRepository.getUserByToken(token);

        if(user !== null) {

            return user;
        }

        return null;
    }

    public async updateUser(token: string, props: UserUpdateOptions): Promise<UserInstance | null> {

        if(props.email === undefined)
            delete props.email;
        if(props.name === undefined)
            delete props.name;
        if(props.surname === undefined)
            delete props.surname;
        const user = await UserRepository.updateUser(token, props);

        return user;
    }

    public async resetPassword(user: UserInstance, new_password: string) : Promise<UserInstance | null> {

        return await UserRepository.updateUserpassword(user, new_password);
    }

    public async updatePassword(token: string, props: UserUpdatePasswordOptions): Promise<UserInstance | null> {

        const user = await UserRepository.getUserEncryptedPassword(token);
        if(user === null) {
            return null;
        }

        if(props.new_password !== props.new_password_confirm) {
            throw new Error('Error new_password and new_password_confirm are not they same')
        }

        const isSamePassword = await compare(props.password, user.password);
        if(!isSamePassword) {
            throw new Error("The password is invalid");
        }

        return await UserRepository.updateUserpassword(user, props.new_password);
    }

    public async deleteUser(token: string, password: string): Promise<void | null> {

        const user = await UserRepository.getUserEncryptedPassword(token);
        if(user === null) {
            return null;
        }

        const isSamePassword = await compare(password, user.password);
        if(!isSamePassword) {
            throw new Error("The password is invalid");
        }

        return await UserRepository.deleteUser(token);
    }

    public async authenticateUserWithToken(token: string | undefined): Promise< UserInstance | undefined | null> {

        if(token === undefined) {
            return undefined;
        }

        const tokenWithoutBearer = token.replace('Bearer ', '');
        return await this.getUserByToken(tokenWithoutBearer);
    }

    public async getUserByToken(token: string): Promise<UserInstance | null> {

        const user = await UserRepository.getUserByToken(token);

        if(user !== null) {

            return user;
        }

        return null;
    }

    public async getUserByEmail(email: string): Promise<UserInstance | null> {


        const user = await UserRepository.getUserByEmail(email);

        if(user !== null) {

            return user;
        }

        return null;
    }

}
