import {SequelizeManager} from "../../models";
import {UserInstance} from "../../models/user.model";
import {fixture} from "./fixture";
import {RoleFixture} from "./role.fixture";

export class UserFixture implements fixture{

    user_eric?: UserInstance;
    user_jean?: UserInstance;
    user_pam?: UserInstance;
    user_admin_rachel?: UserInstance;
    user_admin_margot?: UserInstance;
    user_admin_leonard?: UserInstance;

    private static instance: UserFixture;

    public static async getInstance(): Promise<UserFixture> {
        if(UserFixture.instance === undefined) {
            UserFixture.instance = new UserFixture();
        }
        return UserFixture.instance;
    }

    private constructor() {};

    public async fillTable(): Promise<void> {

        const manager = await SequelizeManager.getInstance();
        const roleFixture = await RoleFixture.getInstance();

        await Promise.all([
            this.user_eric = await manager.user.create({
                name: "eric",
                surname: "delacroix",
                email: "eric@gmail.com",
                password: "azertyuiop",
                username: "eric"
            }),
            this.user_jean = await manager.user.create({
                name: "Jean",
                surname: "tom",
                email: "tom@gmail.com",
                password: "azertyuiop",
                username: "jean"
            }),
            this.user_pam = await manager.user.create({
                name: "gentil",
                surname: "Pam",
                email: "pam.gentil@gmail.com",
                password: "azertyuiop",
                username: "val-de-jean"
            }),
            this.user_admin_margot = await manager.user.create({
                name: "margaux",
                surname: "prodic",
                email: "margaux.prodic@gmail.com",
                password: "azertyuiop",
                username: "michel"
            }),
            this.user_admin_rachel = await manager.user.create({
                name: "Rachel",
                surname: "Friend",
                email: "rachel@notime.com",
                password: "azertyuiop",
                username: "tati"
            }),
            this.user_admin_leonard = await manager.user.create({
                name: "Leonard",
                surname: "Dicapr",
                email: "leonardo.discpar@gmail.com",
                password: "azertyuiop",
                username: "darkSasuke"
            }),
        ]);

        await Promise.all([
            await this.user_eric.setRole(roleFixture.role_user),
            await this.user_jean.setRole(roleFixture.role_user),
            await this.user_pam.setRole(roleFixture.role_user),
            await this.user_admin_margot.setRole(roleFixture.role_admin),
            await this.user_admin_rachel.setRole(roleFixture.role_admin),
            await this.user_admin_leonard.setRole(roleFixture.role_admin)
        ]);

    }

    public async destroyFieldsTable(): Promise<void> {
        const manager = await SequelizeManager.getInstance();
        await manager.user.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0');
        await manager.user.destroy({
            truncate: true,
            force: true
        });
    }
}
