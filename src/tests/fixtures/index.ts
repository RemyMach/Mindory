import {UserFixture} from './user.fixture';
import {RoleFixture} from './role.fixture';
import {SessionFixture} from './session.fixture';
import {PasswordResetFixture} from "./passwordReset.fixture";
import {DeckFixture} from "./deck.fixture";
import {CardFixture} from "./card.fixture";
import {PartPythonFixture} from "./Part/partPython";
import {ShotPartOneFixture} from "./Shot/shotPartOne.fixture";
import {ShotPartTwoFixture} from "./Shot/shotPartTwo.fixture";
import {ShotPartThreeFixture} from "./Shot/shotPartThree.fixture";
import {PartPythonTwoPlayerFixture} from "./Part/partPythonTwoPlayer.fixture";
import {Shot2playerPartOneFixture} from "./Shot/shot2PlayerPartOne.fixture";
import {Shot2PlayerPartTwoFixture} from "./Shot/shot2PlayerPartTwo.fixture";
import {RoomPythonFixture} from "./Room/roomPython.fixture";
import {UserSocketPythonFixture} from "./Room/userSocketPython.fixture";


export async function fillTables(): Promise<void> {

    const roleFixture = await RoleFixture.getInstance();
    const userFixture = await UserFixture.getInstance();
    const sessionFixture = await SessionFixture.getInstance();
    const deckFixture = await DeckFixture.getInstance();
    const cardFixture = await CardFixture.getInstance();
    const partPythonFixture = await PartPythonFixture.getInstance();
    const partPythonTwoPlayerFixture = await PartPythonTwoPlayerFixture.getInstance();
    const shotPartOneFixture = await ShotPartOneFixture.getInstance();
    const shotPartTwoFixture = await ShotPartTwoFixture.getInstance();
    const shotPartThreeFixture = await ShotPartThreeFixture.getInstance();
    const shot2playerPartOneFixture = await Shot2playerPartOneFixture.getInstance();
    const shot2PlayerPartTwoFixture = await Shot2PlayerPartTwoFixture.getInstance();
    const roomPythonFixture = await RoomPythonFixture.getInstance();
    const userSocketPythonFixture = await UserSocketPythonFixture.getInstance();

    await roleFixture.fillTable();
    await userFixture.fillTable();
    await sessionFixture.fillTable();
    await deckFixture.fillTable();
    await cardFixture.fillTable();
    await partPythonFixture.fillTable();
    await shotPartOneFixture.fillTable();
    await shotPartTwoFixture.fillTable();
    await shotPartThreeFixture.fillTable();
    await partPythonTwoPlayerFixture.fillTable();
    await shot2playerPartOneFixture.fillTable();
    await shot2PlayerPartTwoFixture.fillTable();
    await roomPythonFixture.fillTable();
    await userSocketPythonFixture.fillTable();
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
    const roomPythonFixture = await RoomPythonFixture.getInstance();
    const userSocketPythonFixture = await UserSocketPythonFixture.getInstance();

    await sessionFixture.destroyFieldsTable();
    await passwordResetFixture.destroyFieldsTable();
    await userFixture.destroyFieldsTable();
    await roleFixture.destroyFieldsTable();
    await deckFixture.destroyFieldsTable();
    await cardFixture.destroyFieldsTable();
    await roomPythonFixture.destroyFieldsTable();
    await partPythonFixture.destroyFieldsTable();
    await shotPartOneFixture.destroyFieldsTable();
    await userSocketPythonFixture.destroyFieldsTable();
}
