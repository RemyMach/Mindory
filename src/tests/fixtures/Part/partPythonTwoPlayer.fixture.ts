import {CardCreationProps, CardInstance, CardProps} from "../../../models/card.model";
import {text} from "express";
import {PartInstance, PartProps} from "../../../models/part.model";
import {getCardOfAPLayingDeck} from "../../../utils/cards/getCardsFromIds";
import {fixture} from "../fixture";
import {SequelizeManager} from "../../../models";
import {DeckFixture} from "../deck.fixture";
import {UserFixture} from "../user.fixture";

export class PartPythonTwoPlayerFixture implements fixture{

    part_1?: PartInstance;
    part_2?: PartInstance;
    part_3?: PartInstance;


    private static instance: PartPythonTwoPlayerFixture;

    public static async getInstance(): Promise<PartPythonTwoPlayerFixture> {
        if(PartPythonTwoPlayerFixture.instance === undefined) {
            PartPythonTwoPlayerFixture.instance = new PartPythonTwoPlayerFixture();
        }
        return PartPythonTwoPlayerFixture.instance;
    }

    private constructor() {};

    public async fillTable(): Promise<void> {
        const manager = await SequelizeManager.getInstance();
        const userFixture = await UserFixture.getInstance();
        const deckFixture = await DeckFixture.getInstance();
        this.part_1 = await manager.part.create();

        const cards = await getCardOfAPLayingDeck([3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32]);
        await Promise.all([
            this.part_1.addUser(userFixture.user_jean),
            this.part_1.addUser(userFixture.user_admin_rachel),
            this.part_1.setDeck(deckFixture.deck_python),
            cards.map((card: CardInstance | null) => {
                if(card != null)
                    this.part_1?.addCard(card);
            })
        ]);

        this.part_2 = await manager.part.create();

        const cards2 = await getCardOfAPLayingDeck([3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32]);
        await Promise.all([
            this.part_2.addUser(userFixture.user_jean),
            this.part_2.addUser(userFixture.user_admin_rachel),
            this.part_2.setDeck(deckFixture.deck_python),
            cards2.map((card: CardInstance | null) => {
                if(card != null)
                    this.part_2?.addCard(card);
            })
        ]);

        this.part_3 = await manager.part.create();

        const cards3 = await getCardOfAPLayingDeck([3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32]);
        await Promise.all([
            this.part_3.addUser(userFixture.user_jean),
            this.part_3.addUser(userFixture.user_admin_leonard),
            this.part_3.setDeck(deckFixture.deck_python),
            cards3.map((card: CardInstance | null) => {
                if(card != null)
                    this.part_3?.addCard(card);
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

