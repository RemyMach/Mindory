import {ModelCtor} from "sequelize";
import {UserInstance} from "../models/user.model";
import {SequelizeManager} from "../models";
import { cardCreateOption, CardInstance} from "../models/card.model";
import {DeckInstance} from "../models/deck.model";
import {ShotInstance} from "../models/shot.model";
import {performance} from "perf_hooks";
import {PartInstance} from "../models/part.model";
import {getCardOfAPLayingDeck} from "../utils/cards/getCardsFromIds";
import BasicError from "../errors/basicError";
import {PartRepository} from "../repositories/part.repository";

export class ShotController {

    user: ModelCtor<UserInstance>;
    card: ModelCtor<CardInstance>;
    shot: ModelCtor<ShotInstance>;
    part: ModelCtor<PartInstance>


    private static instance: ShotController;

    public static async getInstance(): Promise<ShotController> {
        if (ShotController.instance === undefined) {
            const {user, card, deck, shot, part} = await SequelizeManager.getInstance();
            ShotController.instance = new ShotController(user, card, deck, shot, part);
        }
        return ShotController.instance;
    }

    private constructor(user: ModelCtor<UserInstance>, card: ModelCtor<CardInstance>, deck: ModelCtor<DeckInstance>, shot: ModelCtor<ShotInstance>, part: ModelCtor<PartInstance>) {
        this.user = user;
        this.card = card;
        this.shot = shot;
        this.part = part;
    }

    public async createShot(part: PartInstance, user: UserInstance, cardIds: number[], time: number): Promise<ShotInstance> {

        const cards = await getCardOfAPLayingDeck(cardIds);
        const cardAssociate = await cards[0]?.getCardAssociate();
        if(cardAssociate === undefined)
            throw new BasicError("The two card are not valid")
        const isValid = cardAssociate.id === cards[1]?.id;
        // @ts-ignore
        const shot = await this.shot.create({isValid, time});
        await Promise.all([
            shot.setPart(part),
            shot.setUser(user),
            cards.map((card: CardInstance | null) => {
                if(card != null)
                    shot.addCard(card);
            })
        ]);

        return shot;
    }

    public async verifyIfUserIsInThePart(user: UserInstance, part: PartInstance): Promise<boolean> {

        return await PartRepository.getAPartIfTheUserPlayInIt(user, part) !== null;
    }

}
