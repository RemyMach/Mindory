import {PasswordResetInstance} from "../models/passwordReset.model";
import {UserInstance} from "../models/user.model";
import {PasswordResetController} from "../controllers/passwordReset.controller";
import {RoomController} from "../controllers/room.controller";
import {UserController} from "../controllers/user.controller";
import {RoomInstance} from "../models/room.model";
import {where} from "sequelize";

export class RoomRepository {

    public static async getAllRoomForAUser(user: UserInstance): Promise<RoomInstance[] | null> {
        const roomController = await RoomController.getInstance();
        return await roomController.room.findAll({
            include: [{
                model: roomController.part,
                include: [{
                    model: roomController.user,
                    where: {
                        id: user.id
                    }
                }]
            }]
        });
    }

    public static async destroyRooms(rooms: RoomInstance[]): Promise<void> {

        await Promise.all(
            rooms.map(room => room.destroy())
        );
    }

    public static async updateKeyWord(room: RoomInstance, keyWord: string): Promise<void> {
        await room.update({keyword: keyWord});
    }

    public static async getRoomByToken(token: string): Promise<RoomInstance | null> {
        const roomController = await RoomController.getInstance();
        return await roomController.room.findOne({
            where: {
                token
            }
        });
    }
}
