import {ModelCtor} from "sequelize";
import {UserInstance} from "../models/user.model";
import {SequelizeManager} from "../models";
import { cardCreateOption, CardInstance} from "../models/card.model";
import {DeckInstance} from "../models/deck.model";
import {CardRepository} from "../repositories/card.repository";
import {DeckRepository} from "../repositories/deck.repository";
import BasicError from "../errors/basicError";
import {shuffleArray} from "../utils/array/shuffle";

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

    public async getADeckForPlaying(deck: DeckInstance): Promise<DeckInstance | null> {
        const NUMBER_CARD_FOR_A_GAME = 30;
        const deckCards = await DeckRepository.getAllCardOfADeck(deck);
        if(deckCards === null)
            throw new BasicError("the deck doesn't exist")
        const deckJson = JSON.parse(JSON.stringify(deckCards));
        const cards = deckJson["Cards"]
        deckJson["Cards"] = this.selectNumberOfCard(cards, NUMBER_CARD_FOR_A_GAME);
        return deckJson;
    }
    
    private selectNumberOfCard(cards: any, numberCard: number): any[] {
        const result = [];
        const cardKeysInResult: any = {}
        for(let i = 0; i < Object.keys(cards).length; i++) {
            if (cards[i]["cardAssociate"] !== null && !cardKeysInResult[cards[i]["id"]]) {
                result.push(cards[i])
                result.push(this.getTheAssociateCard(i+1, cards[i]["cardAssociate"]["id"] ,cards));
                cardKeysInResult[cards[i]['id']] = 1;
                cardKeysInResult[cards[i]["cardAssociate"]["id"]] = 1;
            }
            if(result.length >= numberCard)
                break;
        }

        shuffleArray(result);
        return result;
    }

    private getTheAssociateCard(start: number, indexResearch: number, cards: any): JSON {

        for(let i = start; i < Object.keys(cards).length; i++) {
            if (cards[i]["id"] == indexResearch) {
                return cards[i];
            }
        }
        return cards;
    }
}
