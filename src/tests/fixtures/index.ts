import {UserFixture} from './user.fixture';
import {RoleFixture} from './role.fixture';
import {SessionFixture} from './session.fixture';
import {PasswordResetFixture} from "./passwordReset.fixture";
import {DeckFixture} from "./deck.fixture";
import {CardFixture} from "./card.fixture";
import {PartPythonFixture} from "./Part/partPython";
import {ShotPartOneFixture} from "./Shot/shotPartOne.fixture";


export async function fillTables(): Promise<void> {

    const roleFixture = await RoleFixture.getInstance();
    const userFixture = await UserFixture.getInstance();
    const sessionFixture = await SessionFixture.getInstance();
    const deckFixture = await DeckFixture.getInstance();
    const cardFixture = await CardFixture.getInstance();
    const partPythonFixture = await PartPythonFixture.getInstance();
    const shotPartOneFixture = await ShotPartOneFixture.getInstance();

    await roleFixture.fillTable();
    await userFixture.fillTable();
    await sessionFixture.fillTable();
    await deckFixture.fillTable();
    await cardFixture.fillTable();
    await partPythonFixture.fillTable();
    await shotPartOneFixture.fillTable();
}

export async function destroyTablesElement(): Promise<void> {

    const roleFixture = await RoleFixture.getInstance();
    const userFixture = await UserFixture.getInstance();
    const sessionFixture = await SessionFixture.getInstance();
    const passwordResetFixture = await PasswordResetFixture.getInstance();
    const deckFixture = await DeckFixture.getInstance();
    const cardFixture = await CardFixture.getInstance();
    const partPythonFixture = await PartPythonFixture.getInstance();
    const shotPartOneFixture = await ShotPartOneFixture.getInstance();


    await sessionFixture.destroyFieldsTable();
    await passwordResetFixture.destroyFieldsTable();
    await userFixture.destroyFieldsTable();
    await roleFixture.destroyFieldsTable();
    await deckFixture.destroyFieldsTable();
    await cardFixture.destroyFieldsTable();
    await partPythonFixture.destroyFieldsTable();
    await shotPartOneFixture.destroyFieldsTable();
}
