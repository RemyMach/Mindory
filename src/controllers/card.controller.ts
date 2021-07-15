import {ModelCtor} from "sequelize";
import {UserInstance} from "../models/user.model";
import {SequelizeManager} from "../models";
import { cardCreateOption, CardInstance} from "../models/card.model";
import {DeckInstance} from "../models/deck.model";
import {CardRepository} from "../repositories/card.repository";
import {PartInstance} from "../models/part.model";

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
            await Promise.all([
                card.setCardAssociate(props.cardAssociate),
                card.setDeck(props.deck),
                props.cardAssociate.setCardAssociate(card)]);
        else
            await card.setDeck(props.deck);

        return card;
    }

    public async getCardIfAvailableAndInTheSameDeck(cardAssociateId: number, deck: DeckInstance): Promise<CardInstance | null> {
        return await CardRepository.getCardIfNotAlreadyPairedWithAnOther(cardAssociateId, deck);
    }

    public async getAllCardsValidFromThePart(part: PartInstance): Promise<CardInstance[]> {
        return await CardRepository.getAllValidCardsPlayInAPart(part);
    }

    public async getAllPointsInAPartOfAUser(part: PartInstance, user: UserInstance): Promise<number> {

        const validCards = await CardRepository.getAllValidCardsForAUser(user, part);
        return validCards.length === 0 ? 0 : validCards.length / 2
    }
}
