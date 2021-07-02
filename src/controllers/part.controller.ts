import {ModelCtor} from "sequelize";
import {UserInstance} from "../models/user.model";
import {SequelizeManager} from "../models";
import { cardCreateOption, CardInstance} from "../models/card.model";
import {DeckInstance} from "../models/deck.model";
import {ShotInstance} from "../models/shot.model";
import {performance} from "perf_hooks";
import {PartInstance} from "../models/part.model";
export class PartController {

    user: ModelCtor<UserInstance>;
    card: ModelCtor<CardInstance>;
    deck: ModelCtor<DeckInstance>;
    shot: ModelCtor<ShotInstance>


    private static instance: PartController;

    public static async getInstance(): Promise<PartController> {
        if (PartController.instance === undefined) {
            const {user, card, deck, shot} = await SequelizeManager.getInstance();
            PartController.instance = new PartController(user, card, deck, shot);
        }
        return PartController.instance;
    }

    private constructor(user: ModelCtor<UserInstance>, card: ModelCtor<CardInstance>, deck: ModelCtor<DeckInstance>, shot: ModelCtor<ShotInstance>) {
        this.user = user;
        this.card = card;
        this.deck = deck;
        this.shot = shot;
    }

    public async registerAllCardOfThePart(deck: DeckInstance, part: PartInstance): Promise<void> {

        const cards = await this.getCardOfAPLayingDeck(deck);
        cards.forEach((card: CardInstance) => part.addCard(card));
    }

    private async getCardOfAPLayingDeck(deck: DeckInstance): Promise<CardInstance[]> {
        const deckJSON = JSON.parse(JSON.stringify(deck));
        const cards = deckJSON["Cards"];
        return await Promise.all<CardInstance>(
            cards.map((card: any) => this.card.findByPk(card["id"]))
        );
    }
}
