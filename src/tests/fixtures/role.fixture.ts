import {SequelizeManager} from "../../models";
import {RoleInstance} from "../../models/role.model";
import {fixture} from "./fixture";

export class RoleFixture implements fixture{

    role_user?: RoleInstance;
    role_admin?: RoleInstance;
    role_test_update?: RoleInstance;
    role_test_delete?: RoleInstance;

    private static instance: RoleFixture;

    public static async getInstance(): Promise<RoleFixture> {
        if(RoleFixture.instance === undefined) {
            RoleFixture.instance = new RoleFixture();
        }
        return RoleFixture.instance;
    }

    private constructor() {};

    public async fillTable(): Promise<void> {
        const manager = await SequelizeManager.getInstance();

        await Promise.all([
            this.role_user = await manager.role.create({
                label: "user"
            }),
            this.role_admin = await manager.role.create({
                label: "admin"
            }),
            this.role_test_delete = await manager.role.create({
                label: "test_delete"
            }),
            this.role_test_update = await manager.role.create({
                label: "test_update"
            })
        ])
    }

    public async destroyFieldsTable(): Promise<void> {
        const manager = await SequelizeManager.getInstance();
        await manager.user.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0');
        await manager.role.destroy({
            truncate: true,
            force: true
        });
    }
}
