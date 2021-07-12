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
import {PasswordResetInstance} from "../models/passwordReset.model";
import {PasswordResetRepository} from "../repositories/passwordReset.repository";
import {RoomRepository} from "../repositories/room.repository";

export class RoomController {

    user: ModelCtor<UserInstance>;
    part: ModelCtor<PartInstance>;
    userSocket: ModelCtor<UserSocketInstance>;
    room: ModelCtor<RoomInstance>;
    deck: ModelCtor<DeckInstance>;


    private static instance: RoomController;

    public static async getInstance(): Promise<RoomController> {
        if (RoomController.instance === undefined) {
            const {user, userSocket, part, room, deck} = await SequelizeManager.getInstance();
            RoomController.instance = new RoomController(user, userSocket, part, room, deck);
        }
        return RoomController.instance;
    }

    private constructor(user: ModelCtor<UserInstance>, userSocket: ModelCtor<UserSocketInstance>, part: ModelCtor<PartInstance>, room: ModelCtor<RoomInstance>, deck: ModelCtor<DeckInstance>) {
        this.user = user;
        this.userSocket = userSocket;
        this.part = part;
        this.room = room;
        this.deck = deck;
    }

    public async createRoom(part: PartInstance): Promise<RoomInstance> {

        const token = generateToken();
        const room = await this.room.create({token});
        await room.setPart(part);

        return room;
    }


    public async deleteAllRoomsForAUser(user: UserInstance): Promise<void> {

        const rooms = await RoomRepository.getAllRoomForAUser(user);
        if(!rooms)
            return;

        await RoomRepository.destroyRooms(rooms);
    }

    public async getRoomUpForAUser(user: UserInstance): Promise<RoomInstance[] | null> {
        return await RoomRepository.getAllRoomForAUser(user);
    }

    public async updateRoomKeyWord(room: RoomInstance, keyWord: string): Promise<void> {
        await RoomRepository.updateKeyWord(room, keyWord);
    }

    public async getRoomByToken(token: string): Promise<RoomInstance | null> {
        return await RoomRepository.getRoomByToken(token);
    }

    public async roomIsAvailableForANewUser(room: RoomInstance): Promise<boolean> {

        return await this.getUserSocketNumberInARoom(room) <= 1;
    }

    public async getUserSocketNumberInARoom(room: RoomInstance): Promise<number> {

        const userSockets = await room.getUserSockets();
        return userSockets.length;
    }

}
