import {UserFixture} from './user.fixture';
import {RoleFixture} from './role.fixture';
import {SessionFixture} from './session.fixture';
import {PasswordResetFixture} from "./passwordReset.fixture";


export async function fillTables(): Promise<void> {

    const roleFixture = await RoleFixture.getInstance();
    const userFixture = await UserFixture.getInstance();
    const sessionFixture = await SessionFixture.getInstance();

    await roleFixture.fillTable();
    await userFixture.fillTable();
    await sessionFixture.fillTable();
}

export async function destroyTablesElement(): Promise<void> {

    const roleFixture = await RoleFixture.getInstance();
    const userFixture = await UserFixture.getInstance();
    const sessionFixture = await SessionFixture.getInstance();
    const passwordResetFixture = await PasswordResetFixture.getInstance();


    await sessionFixture.destroyFieldsTable();
    await passwordResetFixture.destroyFieldsTable();
    await userFixture.destroyFieldsTable();
    await roleFixture.destroyFieldsTable();
}
