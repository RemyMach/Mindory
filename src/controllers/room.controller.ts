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
import {UserSocketInstance} from "../models/userSocket.model";
import {RoomInstance} from "../models/room.model";
import {generateToken} from "../utils/password_reset/password_reset";

export class RoomController {

    user: ModelCtor<UserInstance>;
    part: ModelCtor<PartInstance>;
    userSocket: ModelCtor<UserSocketInstance>;
    room: ModelCtor<RoomInstance>;


    private static instance: RoomController;

    public static async getInstance(): Promise<RoomController> {
        if (RoomController.instance === undefined) {
            const {user, userSocket, part, room} = await SequelizeManager.getInstance();
            RoomController.instance = new RoomController(user, userSocket, part, room);
        }
        return RoomController.instance;
    }

    private constructor(user: ModelCtor<UserInstance>, userSocket: ModelCtor<UserSocketInstance>, part: ModelCtor<PartInstance>, room: ModelCtor<RoomInstance>) {
        this.user = user;
        this.userSocket = userSocket;
        this.part = part;
        this.room = room;
    }

    public async createRoom(part: PartInstance, user: UserInstance, cardIds: number[], time: number): Promise<ShotInstance> {

        const token = generateToken();
        const room = await this.room.create({token});

        const cardAssociate = await cards[0]?.getCardAssociate();
        if (cardAssociate === undefined)
            throw new BasicError("The two card are not valid")
        const isValid = cardAssociate.id === cards[1]?.id;
        // @ts-ignore
        const shot = await this.shot.create({isValid, time});
        await Promise.all([
            shot.setPart(part),
            shot.setUser(user),
            cards.map((card: CardInstance | null) => {
                if (card != null)
                    shot.addCard(card);
            })
        ]);

        return shot;
    }
}
