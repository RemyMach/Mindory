import {ModelCtor} from "sequelize";
import {UserInstance} from "../models/user.model";
import {SequelizeManager} from "../models";
import { cardCreateOption, CardInstance} from "../models/card.model";
import {DeckInstance} from "../models/deck.model";
import {CardRepository} from "../repositories/card.repository";

export class CardController {

    user: ModelCtor<UserInstance>;
    card: ModelCtor<CardInstance>;
    deck: ModelCtor<DeckInstance>;


    private static instance: CardController;

    public static async getInstance(): Promise<CardController> {
        if (CardController.instance === undefined) {
            const {user, card, deck} = await SequelizeManager.getInstance();
            CardController.instance = new CardController(user, card, deck);
        }
        return CardController.instance;
    }

    private constructor(user: ModelCtor<UserInstance>, card: ModelCtor<CardInstance>, deck: ModelCtor<DeckInstance>) {
        this.user = user;
        this.card = card;
        this.deck = deck;
    }

    public async createCard(props: cardCreateOption): Promise<CardInstance | null> {
        let createValues = JSON.parse(JSON.stringify({"image": props.image ? props.image: null, "text": props.text ? props.text: null}))

        const card = await this.card.create({
            image: createValues.image,
            text: createValues.text
        });

        if(props.cardAssociate)
            await Promise.all([card.setCard(props.cardAssociate), card.setDeck(props.deck)]);
        else
            await card.setDeck(props.deck);

        return card;
    }

    public async getCardIfAvailable(cardAssociateId: number): Promise<CardInstance | null> {
        return await CardRepository.getCardIfNotAlreadyPairedWithAnOther(cardAssociateId);
    }



}
