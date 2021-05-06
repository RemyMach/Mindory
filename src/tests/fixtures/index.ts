import {UserFixture} from './user.fixture';
import {RoleFixture} from './role.fixture';
import {SessionFixture} from './session.fixture';


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


    await sessionFixture.destroyFieldsTable();
    await userFixture.destroyFieldsTable();
    await roleFixture.destroyFieldsTable();
}
