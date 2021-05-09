import {SequelizeManager} from "../../models";
import {RoleInstance} from "../../models/role.model";
import {fixture} from "./fixture";

export class PasswordResetFixture implements fixture{


    private static instance: PasswordResetFixture;

    public static async getInstance(): Promise<PasswordResetFixture> {
        if(PasswordResetFixture.instance === undefined) {
            PasswordResetFixture.instance = new PasswordResetFixture();
        }
        return PasswordResetFixture.instance;
    }

    private constructor() {};

    public async fillTable(): Promise<void> {

    }

    public async destroyFieldsTable(): Promise<void> {
        const manager = await SequelizeManager.getInstance();
        await manager.passwordReset.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0');
        await manager.passwordReset.destroy({
            truncate: true,
            force: true
        });
    }
}
