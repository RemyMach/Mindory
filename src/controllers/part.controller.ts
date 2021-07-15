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
import {types} from "util";
import {UserRepository} from "../repositories/user.repository";

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

    public async createPart(deck: DeckInstance, user: UserInstance | null, cardIds: number[] | null = null, cardsInstance: CardInstance[] | null = null): Promise<PartInstance> {

        const part = await this.part.create();
        let cards : (CardInstance | null)[];
        if(cardIds)
            cards = await getCardOfAPLayingDeck(cardIds);
        else if(cardsInstance !== null)
            cards = cardsInstance;

        if(user !== null)
            await part.addUser(user);

        await part.setDeck(deck);
        await Promise.all([
            cards!.map((card: CardInstance | null) => {
                if(card != null)
                    part.addCard(card);
            })
        ]);

        return part;
    }

    public async partIsEnd(part: PartInstance): Promise<boolean> {
        const cardsPlay = await CardRepository.getAllCardsPlayDuringThePart(part);
        if(cardsPlay === null || cardsPlay.length !== 30 )
            return false;

        const cardsOfThePart = await CardRepository.getAllCardsOfAPart(part);
        if(cardsOfThePart === null)
            return false;

        return this.cardsPlayAreTheSameThanCardsPart(cardsPlay, cardsOfThePart);
    }

    private cardsPlayAreTheSameThanCardsPart(cardsPlay: CardInstance[], cardsOfThePart: CardInstance[]): boolean {
        let cardsPlayIds = new Map<number, number>();
        for (let card of cardsPlay) {
            if(!cardsPlayIds.has(card.id))
                cardsPlayIds.set(card.id, 1);
            else
                cardsPlayIds.set(card.id, cardsPlayIds.get(card.id)! + 1);
        }

        if(cardsPlayIds.size !== 30)
            return false;

        for (let card of cardsOfThePart) {
            if(cardsPlayIds.has(card.id))
                cardsPlayIds.set(card.id, cardsPlayIds.get(card.id)! - 1);
        }

        for (let value of Array.from(cardsPlayIds.values())) {
            if(value != 0)
                return false;
        }

        return true;

    }

    public async registerTheEndOfThePart(part: PartInstance, time: number,): Promise<void> {

        await part.update({time});
    }

    public async addAUserToAPart(user: UserInstance, part: PartInstance): Promise<void> {
        console.log('on passe bien dans l\'add User');
        await part.addUser(user);
    }

    public async userIsAlreadyInPart(user: UserInstance, part: PartInstance): Promise<boolean> {

        return await UserRepository.userIsInPart(part, user) !== null;
    }

    public async partIsPlayedByAuthentifiedUsers(part: PartInstance): Promise<boolean> {
        const users = await part.getUsers();
        return users.length == 2;
    }
}
