import {ModelCtor} from "sequelize";
import {UserInstance} from "../models/user.model";
import {SequelizeManager} from "../models";
import { cardCreateOption, CardInstance} from "../models/card.model";
import {DeckInstance} from "../models/deck.model";
import {ShotInstance} from "../models/shot.model";
import {performance} from "perf_hooks";
import {PartInstance} from "../models/part.model";
import {getCardOfAPLayingDeck} from "../utils/cards/getCardsFromIds";
import {PartRepository} from "../repositories/part.repository";
import {CardRepository} from "../repositories/card.repository";

export class PartController {

    user: ModelCtor<UserInstance>;
    card: ModelCtor<CardInstance>;
    deck: ModelCtor<DeckInstance>;
    shot: ModelCtor<ShotInstance>;
    part: ModelCtor<PartInstance>


    private static instance: PartController;

    public static async getInstance(): Promise<PartController> {
        if (PartController.instance === undefined) {
            const {user, card, deck, shot, part} = await SequelizeManager.getInstance();
            PartController.instance = new PartController(user, card, deck, shot, part);
        }
        return PartController.instance;
    }

    private constructor(user: ModelCtor<UserInstance>, card: ModelCtor<CardInstance>, deck: ModelCtor<DeckInstance>, shot: ModelCtor<ShotInstance>, part: ModelCtor<PartInstance>) {
        this.user = user;
        this.card = card;
        this.deck = deck;
        this.shot = shot;
        this.part = part;
    }

    public async createPart(deck: DeckInstance, user: UserInstance, cardIds: number[]): Promise<PartInstance> {

        const part = await this.part.create();
        const cards = await getCardOfAPLayingDeck(cardIds);
        await Promise.all([
            part.addUser(user),
            part.setDeck(deck),
            cards.map((card: CardInstance | null) => {
                if(card != null)
                    part.addCard(card);
            })
        ]);

        return part;
    }

    public async partIsEnd(part: PartInstance): Promise<boolean> {
        const cardsPlay = await CardRepository.getAllCardsPlayDuringThePart(part);
        console.log(cardsPlay);
        if(cardsPlay === null || cardsPlay.length !== 30 )
            return false;

        const cardsOfThePart = await CardRepository.getAllCardsOfAPart(part);


        return true;
    }
}
