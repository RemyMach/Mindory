import {ModelCtor} from "sequelize";
import {UserInstance} from "../models/user.model";
import {SequelizeManager} from "../models";
import { cardCreateOption, CardInstance} from "../models/card.model";
import {DeckInstance} from "../models/deck.model";
import {CardRepository} from "../repositories/card.repository";
import {DeckRepository} from "../repositories/deck.repository";

export class DeckController {

    user: ModelCtor<UserInstance>;
    card: ModelCtor<CardInstance>;
    deck: ModelCtor<DeckInstance>;


    private static instance: DeckController;

    public static async getInstance(): Promise<DeckController> {
        if (DeckController.instance === undefined) {
            const {user, card, deck} = await SequelizeManager.getInstance();
            DeckController.instance = new DeckController(user, card, deck);
        }
        return DeckController.instance;
    }

    private constructor(user: ModelCtor<UserInstance>, card: ModelCtor<CardInstance>, deck: ModelCtor<DeckInstance>) {
        this.user = user;
        this.card = card;
        this.deck = deck;
    }

    public async getADeckWithAllCards(deck: DeckInstance): Promise<DeckInstance | null> {

        return DeckRepository.getAllCardOfADeck(deck);
    }
}
