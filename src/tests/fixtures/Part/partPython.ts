import {CardCreationProps, CardInstance, CardProps} from "../../../models/card.model";
import {text} from "express";
import {PartInstance, PartProps} from "../../../models/part.model";
import {getCardOfAPLayingDeck} from "../../../utils/cards/getCardsFromIds";
import {fixture} from "../fixture";
import {SequelizeManager} from "../../../models";
import {DeckFixture} from "../deck.fixture";
import {UserFixture} from "../user.fixture";

export class PartPythonFixture implements fixture{

    part_1?: PartInstance;


    private static instance: PartPythonFixture;

    public static async getInstance(): Promise<PartPythonFixture> {
        if(PartPythonFixture.instance === undefined) {
            PartPythonFixture.instance = new PartPythonFixture();
        }
        return PartPythonFixture.instance;
    }

    private constructor() {};

    public async fillTable(): Promise<void> {
        const manager = await SequelizeManager.getInstance();
        const userFixture = await UserFixture.getInstance();
        const deckFixture = await DeckFixture.getInstance();
        this.part_1 = await manager.part.create({time: 28});

        const cards = await getCardOfAPLayingDeck([3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32]);
        await Promise.all([
            this.part_1.addUser(userFixture.user_jean),
            this.part_1.setDeck(deckFixture.deck_python),
            cards.map((card: CardInstance | null) => {
                if(card != null)
                    this.part_1?.addCard(card);
            })
        ]);
    }

    public async destroyFieldsTable(): Promise<void> {
        const manager = await SequelizeManager.getInstance();
        await manager.part.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0');
        await manager.part.destroy({
            truncate: true,
            force: true,
        });
    }
}

