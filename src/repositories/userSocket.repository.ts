import {PasswordResetInstance} from "../models/passwordReset.model";
import {UserInstance} from "../models/user.model";
import {PasswordResetController} from "../controllers/passwordReset.controller";
import {RoomController} from "../controllers/room.controller";
import {UserController} from "../controllers/user.controller";
import {RoomInstance} from "../models/room.model";
import {Op, where} from "sequelize";
import {UserSocketController} from "../controllers/userSocket.controller";
import {UserSocketInstance} from "../models/userSocket.model";

export class UserSocketRepository {

    public static async getAllUserSocketInARoom(room: RoomInstance): Promise<UserSocketInstance[]> {
        const userSocketController = await UserSocketController.getInstance();
        return await userSocketController.userSocket.findAll({
            include: [{
                model: userSocketController.room,
                where: {
                    id: room.id
                }
            }]
        });
    }

    public static async getTheOtherUserInARoom(userSocketId: string, room: RoomInstance): Promise<UserSocketInstance[]> {
        const userSocketController = await UserSocketController.getInstance();
        return await userSocketController.userSocket.findAll({
            where: {
              socketId: {[Op.not]: userSocketId}
            },
            include: [{
                model: userSocketController.room,
                where: {
                    id: room.id
                }
            }]
        });
    }

    public static async getUserWhoHaveUserSocketInTheRoom(user: UserInstance, room: RoomInstance): Promise<UserSocketInstance | null> {
        const userSocketController = await UserSocketController.getInstance();
        return await userSocketController.userSocket.findOne({
            include: [{
                required: true,
                model: userSocketController.room,
                where: {
                    id: room.id
                }
            },{
                required: true,
                model: userSocketController.user,
                where: {
                    id: user.id
                }
            }]
        });
    }
}
