import {UserFixture} from './user.fixture';
import {RoleFixture} from './role.fixture';
import {SessionFixture} from './session.fixture';
import {PasswordResetFixture} from "./passwordReset.fixture";
import {DeckFixture} from "./deck.fixture";
import {CardFixture} from "./card.fixture";


export async function fillTables(): Promise<void> {

    const roleFixture = await RoleFixture.getInstance();
    const userFixture = await UserFixture.getInstance();
    const sessionFixture = await SessionFixture.getInstance();
    const deckFixture = await DeckFixture.getInstance();
    const cardFixture = await CardFixture.getInstance();

    await roleFixture.fillTable();
    await userFixture.fillTable();
    await sessionFixture.fillTable();
    await deckFixture.fillTable();
    await cardFixture.fillTable();
}

export async function destroyTablesElement(): Promise<void> {

    const roleFixture = await RoleFixture.getInstance();
    const userFixture = await UserFixture.getInstance();
    const sessionFixture = await SessionFixture.getInstance();
    const passwordResetFixture = await PasswordResetFixture.getInstance();
    const deckFixture = await DeckFixture.getInstance();
    const cardFixture = await CardFixture.getInstance();


    await sessionFixture.destroyFieldsTable();
    await passwordResetFixture.destroyFieldsTable();
    await userFixture.destroyFieldsTable();
    await roleFixture.destroyFieldsTable();
    await deckFixture.destroyFieldsTable();
    await cardFixture.destroyFieldsTable();
}
