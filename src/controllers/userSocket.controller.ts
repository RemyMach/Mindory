import {ModelCtor} from "sequelize";
import {UserInstance, UserUpdateOptions, UserUpdatePasswordOptions} from "../models/user.model";
import {SequelizeManager} from "../models";
import {RoleInstance} from "../models/role.model";
import {Secret, verify} from 'jsonwebtoken';
import {SessionInstance} from "../models/session.model";
import {UserRepository} from "../repositories/user.repository";
import {compare} from "bcrypt";
import {RoomInstance} from "../models/room.model";
import {UserSocketInstance} from "../models/userSocket.model";
import {UserSocketRepository} from "../repositories/userSocket.repository";

export class UserSocketController {

    user: ModelCtor<UserInstance>;
    room: ModelCtor<RoomInstance>;
    userSocket: ModelCtor<UserSocketInstance>;

    private static instance: UserSocketController;

    public static async getInstance(): Promise<UserSocketController> {
        if(UserSocketController.instance === undefined) {
            const {user, room, userSocket} = await SequelizeManager.getInstance();
            UserSocketController.instance = new UserSocketController(user, room, userSocket);
        }
        return UserSocketController.instance;
    }

    private constructor(user: ModelCtor<UserInstance>, room: ModelCtor<RoomInstance>, userSocket: ModelCtor<UserSocketInstance>) {
        this.user = user;
        this.room = room;
        this.userSocket = userSocket;
    }

    public async createUserSocket(socketId: string, room: RoomInstance): Promise<UserSocketInstance> {
        const userSocket = await this.userSocket.create({socketId});
        await userSocket.setRoom(room);
        return userSocket;
    }

    public async setUserOnASocket(userSocket: UserSocketInstance, user: UserInstance): Promise<void> {
        await userSocket.setUser(user);
    }

    public async getUserSocketBySocketId(userSocketId: string): Promise<UserSocketInstance | null> {
        return await this.userSocket.findOne({where: {socketId: userSocketId}});
    }

    public async deleteUserSocket(userSocket: UserSocketInstance): Promise<void> {
        return await userSocket.destroy();
    }

    public async getAllUserSocketInARoom(room: RoomInstance): Promise<UserSocketInstance[]> {
        return await UserSocketRepository.getAllUserSocketInARoom(room);
    }
}
