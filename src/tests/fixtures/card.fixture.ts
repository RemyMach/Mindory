import {SequelizeManager} from "../../models";
import {RoleInstance} from "../../models/role.model";
import {fixture} from "./fixture";
import {CardInstance} from "../../models/card.model";
import {DeckFixture} from "./deck.fixture";
import {DeckPythonFixture} from "./Deck/deckPython.fixture";

export class CardFixture implements fixture{

    card_no_associate_1?: CardInstance;
    card_no_associate_2?: CardInstance;
    card_associate_1?: CardInstance;
    card_associate_2?: CardInstance;


    private static instance: CardFixture;

    public static async getInstance(): Promise<CardFixture> {
        if(CardFixture.instance === undefined) {
            CardFixture.instance = new CardFixture();
        }
        return CardFixture.instance;
    }

    private constructor() {};

    public async fillTable(): Promise<void> {
        const manager = await SequelizeManager.getInstance();
        const deckFixture = await DeckFixture.getInstance();
        const deckPython = new DeckPythonFixture();

        await Promise.all([
            this.card_no_associate_1 = await manager.card.create({
                image: "src/assets/upload/python.png"
            }),
            this.card_no_associate_2 = await manager.card.create({
                image: "src/assets/upload/python.png"
            }),
            this.card_associate_1 = await manager.card.create({
                text: "Python est un language interprété L'interpréteur Python, convertit le code source en bytecode(.pyc) puis l'exécute"
            }),
            this.card_associate_2 = await manager.card.create({
                text: "le processus d'execution d'un fichier Python"
            }),
            deckPython.cardsInstance = await Promise.all(deckPython.cards.map(async (card) => await manager.card.create(card)))
        ]);

        await Promise.all([
            this.card_no_associate_1?.setDeck(deckFixture.deck_python),
            this.card_no_associate_2?.setDeck(deckFixture.deck_python),
            this.card_associate_1?.setDeck(deckFixture.deck_python),
            this.card_associate_2?.setDeck(deckFixture.deck_python),
            this.card_associate_1?.setCardAssociate(this.card_associate_2),
            this.card_associate_2?.setCardAssociate(this.card_associate_1)
        ]);
        for(let i = 0; i < deckPython.cardsInstance.length; i+=2) {
            await Promise.all([
                deckPython.cardsInstance[i].setDeck(deckFixture.deck_python),
                deckPython.cardsInstance[i+1].setDeck(deckFixture.deck_python),
                await deckPython.cardsInstance[i].setCardAssociate(deckPython.cardsInstance[i+1]),
                await deckPython.cardsInstance[i+1].setCardAssociate(deckPython.cardsInstance[i])
            ]);
        }
    }

    public async destroyFieldsTable(): Promise<void> {
        const manager = await SequelizeManager.getInstance();
        await manager.card.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0');
        await manager.card.destroy({
            truncate: true,
            force: true
        });
    }
}
