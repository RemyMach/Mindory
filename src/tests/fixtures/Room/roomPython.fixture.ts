import {CardCreationProps, CardInstance, CardProps} from "../../../models/card.model";
import {text} from "express";
import {PartInstance, PartProps} from "../../../models/part.model";
import {getCardOfAPLayingDeck} from "../../../utils/cards/getCardsFromIds";
import {fixture} from "../fixture";
import {SequelizeManager} from "../../../models";
import {DeckFixture} from "../deck.fixture";
import {UserFixture} from "../user.fixture";
import {generateToken} from "../../../utils/password_reset/password_reset";
import {PartPythonFixture} from "../Part/partPython";
import {PartPythonTwoPlayerFixture} from "../Part/partPythonTwoPlayer.fixture";
import {RoomInstance} from "../../../models/room.model";

export class RoomPythonFixture implements fixture{

    room_1?: RoomInstance;
    room_2?: RoomInstance;
    room_3?: RoomInstance;


    private static instance: RoomPythonFixture;

    public static async getInstance(): Promise<RoomPythonFixture> {
        if(RoomPythonFixture.instance === undefined) {
            RoomPythonFixture.instance = new RoomPythonFixture();
        }
        return RoomPythonFixture.instance;
    }

    private constructor() {};

    public async fillTable(): Promise<void> {
        const manager = await SequelizeManager.getInstance();
        const partPythonTwoPlayerFixture = await PartPythonTwoPlayerFixture.getInstance();

        const token_1 = generateToken();
        this.room_1 = await manager.room.create({token: token_1});
        await this.room_1.setPart(partPythonTwoPlayerFixture.part_1);

        const token_2 = generateToken();
        this.room_2 = await manager.room.create({token: token_2});
        await this.room_2.setPart(partPythonTwoPlayerFixture.part_2);

        const token_3 = generateToken();
        this.room_3 = await manager.room.create({token: token_3});
        await this.room_3.setPart(partPythonTwoPlayerFixture.part_3);
    }

    public async destroyFieldsTable(): Promise<void> {
        const manager = await SequelizeManager.getInstance();
        await manager.room.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0');
        await manager.room.destroy({
            truncate: true,
            force: true,
        });
    }
}

