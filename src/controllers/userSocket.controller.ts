import {ModelCtor} from "sequelize";
import {UserInstance, UserUpdateOptions, UserUpdatePasswordOptions} from "../models/user.model";
import {SequelizeManager} from "../models";
import {RoleInstance} from "../models/role.model";
import {Secret, verify} from 'jsonwebtoken';
import {SessionInstance} from "../models/session.model";
import {UserRepository} from "../repositories/user.repository";
import {compare} from "bcrypt";
import {RoomInstance} from "../models/room.model";

export class UserSocketController {

    user: ModelCtor<UserInstance>;
    room: ModelCtor<RoomInstance>;
    session: ModelCtor<SessionInstance>;

    private static instance: UserSocketController;

    public static async getInstance(): Promise<UserSocketController> {
        if(UserSocketController.instance === undefined) {
            const {user, room, session} = await SequelizeManager.getInstance();
            UserSocketController.instance = new UserSocketController(user, room, session);
        }
        return UserSocketController.instance;
    }

    private constructor(user: ModelCtor<UserInstance>, room: ModelCtor<RoomInstance>, session: ModelCtor<SessionInstance>) {
        this.user = user;
        this.room = room;
        this.session = session;
    }

}
