import {Op} from "sequelize";
import {PasswordResetController} from "../controllers/passwordReset.controller";
import {UserInstance} from "../models/user.model";
import {PasswordResetInstance} from "../models/passwordReset.model";

export class PasswordResetRepository {

    public static async getAllPasswordResetForAUserExceptLastOne(user: UserInstance, passwordReset: PasswordResetInstance): Promise<PasswordResetInstance[] | null> {
        const passwordController = await PasswordResetController.getInstance();
        return await passwordController.passwordReset.findAll({
            where: {
                id: {
                    [Op.ne]: passwordReset.id
                }
            },
            include: [{
                model: passwordController.user,
                where: {
                    id: user.id
                }
            }]
        });
    }

    public static async destroyPasswordReset(passwordResetForAUser: PasswordResetInstance[]): Promise<void> {
        for (const passwordReset of passwordResetForAUser) {
            await passwordReset.destroy();
        }
    }
}
