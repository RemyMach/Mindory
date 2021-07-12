import {UserInstance} from "../models/user.model";
import {UserController} from "../controllers/user.controller";
import BasicError from "../errors/basicError";
import {RoomController} from "../controllers/room.controller";
import {UserSocketController} from "../controllers/userSocket.controller";
import {Socket} from "socket.io";

export interface UserSocket {
    id: string;
    tokenSession?: string;
    roomId: number;
}

// addUser, removeUser, getUser, getUsersInRoom

const addUserToARoom = async (socket: Socket, { id, tokenSession, roomId }: UserSocket) => {

    // vérifier que si tokenSession filled alors valide
    let user: UserInstance | undefined | null;
    if(tokenSession) {
        const userController = await UserController.getInstance();
        user = await userController.authenticateUserWithToken(tokenSession);
        if(user === undefined) {
            return {
                error: 'the user is not valid'
            }
        }else if (user === null) {
            return {
                error: 'the user is not valid'
            }
        }
    }
    // vérifier que si roomId filled alors valide
    const roomController = await RoomController.getInstance();
    const room = await roomController.room.findByPk(roomId);
    if(!room) {
        return {
            error: 'the room filled is not valid'
        }
    }

    const userSocketController = await UserSocketController.getInstance();

    const userSocket = await userSocketController.createUserSocket(id, room);
    addUserIntoASocketRoom(socket, roomId);
    if(user)
        await userSocketController.setUserOnASocket(userSocket, user);
}

const removeUser = async (socketId: string) => {
    // findIndex cherchera tant qu'il reste des users et s'arrétera quand elle retournera true
    // et on récupère l'index de la ligne qui est égale à true
    const userSocketController = await UserSocketController.getInstance();
    const userSocket =  await userSocketController.getUserSocketBySocketId(socketId);
    if(userSocket === null) {
        return {
            error: 'the socket id doesn\'t exist in this room'
        }
    }
    await userSocketController.deleteUserSocket(userSocket);
}

const getNumberOfUser = async (roomId: number) => {
    // vérifier que si roomId filled alors valide
    const roomController = await RoomController.getInstance();
    const room = await roomController.room.findByPk(roomId);
    if(!room) {
        return {
            error: 'the room filled is not valid'
        }
    }
    return await roomController.getUserSocketNumberInARoom(room);
}

const getUserWhoPlayInFirst = async (roomId: number) => {
    const userSocketController = await UserSocketController.getInstance();
    const roomController = await RoomController.getInstance();
    const room = await roomController.room.findByPk(roomId);
    if(!room) {
        return {
            error: 'the room filled is not valid'
        }
    }
    const users = await userSocketController.getAllUserSocketInARoom(room);

    const randomNumber = Math.floor(Math.random() * 2);
    return users[randomNumber];
}

const addUserIntoASocketRoom = (socket: Socket, roomId: number) => {
    socket.join(String(roomId));
}

export {
    addUserToARoom,
    removeUser,
    getNumberOfUser,
    getUserWhoPlayInFirst
}
