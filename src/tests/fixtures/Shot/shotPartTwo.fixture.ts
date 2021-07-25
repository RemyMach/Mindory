import {CardCreationProps, CardInstance, CardProps} from "../../../models/card.model";
import {text} from "express";
import {PartInstance, PartProps} from "../../../models/part.model";
import {getCardOfAPLayingDeck} from "../../../utils/cards/getCardsFromIds";
import {fixture} from "../fixture";
import {SequelizeManager} from "../../../models";
import {DeckFixture} from "../deck.fixture";
import {UserFixture} from "../user.fixture";
import BasicError from "../../../errors/basicError";
import {PartPythonFixture} from "../Part/partPython";

export class ShotPartTwoFixture implements fixture{

    private static instance: ShotPartTwoFixture;

    public static async getInstance(): Promise<ShotPartTwoFixture> {
        if(ShotPartTwoFixture.instance === undefined) {
            ShotPartTwoFixture.instance = new ShotPartTwoFixture();
        }
        return ShotPartTwoFixture.instance;
    }

    private constructor() {};

    public async fillTable(): Promise<void> {
        const manager = await SequelizeManager.getInstance();
        const userFixture = await UserFixture.getInstance();
        const partPythonFixture = await PartPythonFixture.getInstance();
        const cards = await getCardOfAPLayingDeck([3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32]);

        for(let i=0; i<cards.length; i+=2) {
            const shot = await manager.shot.create({isValid: 1, time: i});
            await Promise.all([
                shot.setPart(partPythonFixture.part_2),
                shot.setUser(userFixture.user_jean),
                shot.addCard(cards[i]!),
                shot.addCard(cards[i+1]!)
            ]);
        }
    }

    public async destroyFieldsTable(): Promise<void> {
        const manager = await SequelizeManager.getInstance();
        await manager.shot.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0');
        await manager.shot.destroy({
            truncate: true,
            force: true
        });
    }
}

