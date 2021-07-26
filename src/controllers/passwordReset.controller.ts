import {ModelCtor, Op} from "sequelize";
import {UserInstance, UserUpdateOptions, UserUpdatePasswordOptions} from "../models/user.model";
import {SequelizeManager} from "../models";
import {RoleInstance} from "../models/role.model";
import {Secret, sign, verify} from 'jsonwebtoken';
import {SessionInstance} from "../models/session.model";
import {PasswordResetInstance} from "../models/passwordReset.model";
import {PasswordResetRepository} from "../repositories/passwordReset.repository";
import {generateToken} from "../utils/password_reset/password_reset";

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

    public async getUserWithFromResetPasswordToken(token: string): Promise< UserInstance | null> {

        try {
            const passwordResetInstance = await PasswordResetRepository.getPasswordResetFromToken(token);

            console.log(" ");
            console.log(passwordResetInstance);
            if(!passwordResetInstance)
                return null;
            return await passwordResetInstance.getUser();
        }catch {
            return null;
        }
    }

    public async createPasswordReset(user: UserInstance): Promise<PasswordResetInstance | null> {
        let passwordReset : PasswordResetInstance;
        try {
            const token = generateToken();
            passwordReset = await this.passwordReset.create({
                token
            });
            await passwordReset.setUser(user);
            await this.deleteOtherTokenBeforeTheLastOne(user, passwordReset);
        }catch {
            return null;
        }
        return passwordReset;
    }

    public async deleteOtherTokenBeforeTheLastOne(user: UserInstance, passwordReset: PasswordResetInstance): Promise<void> {

        const passwordResetInstances = await PasswordResetRepository.getAllPasswordResetForAUserExceptLastOne(user, passwordReset);
        if(!passwordResetInstances)
            return;

        await PasswordResetRepository.destroyPasswordReset(passwordResetInstances);
    }

    public async deleteAllTokenForAUser(user: UserInstance): Promise<void> {

        const passwordResetInstances = await PasswordResetRepository.getAllPasswordResetForAUser(user);
        if(!passwordResetInstances)
            return;

        await PasswordResetRepository.destroyPasswordReset(passwordResetInstances);
    }

}
