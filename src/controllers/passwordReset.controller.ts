import {ModelCtor} from "sequelize";
import {UserInstance, UserUpdateOptions, UserUpdatePasswordOptions} from "../models/user.model";
import {SequelizeManager} from "../models";
import {RoleInstance} from "../models/role.model";
import {Secret, sign, verify} from 'jsonwebtoken';
import {SessionInstance} from "../models/session.model";
import {PasswordResetInstance} from "../models/passwordReset.model";

export class PasswordResetController {

    user: ModelCtor<UserInstance>;
    passwordReset: ModelCtor<PasswordResetInstance>;


    private static instance: PasswordResetController;

    public static async getInstance(): Promise<PasswordResetController> {
        if (PasswordResetController.instance === undefined) {
            const {user, passwordReset} = await SequelizeManager.getInstance();
            PasswordResetController.instance = new PasswordResetController(user, passwordReset);
        }
        return PasswordResetController.instance;
    }

    private constructor(user: ModelCtor<UserInstance>, passwordReset: ModelCtor<PasswordResetInstance>) {
        this.user = user;
        this.passwordReset = passwordReset;
    }

    public async createPasswordReset(user: UserInstance): Promise<PasswordResetInstance | null> {
        let passwordReset : PasswordResetInstance;
        try {
            const token = sign({ id: user.id.toString()}, process.env.JWT_SECRET as Secret);
            passwordReset = await this.passwordReset.create({
                token
            });
            await passwordReset.setUser(user);
        }catch {
            return null;
        }
        return passwordReset;
    }

}
