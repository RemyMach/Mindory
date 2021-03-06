import {UserInstance} from "../models/user.model";
import {UserController} from "../controllers/user.controller";
import BasicError from "../errors/basicError";
import {RoomController} from "../controllers/room.controller";
import {UserSocketController} from "../controllers/userSocket.controller";
import {Socket} from "socket.io";
import {RoomInstance} from "../models/room.model";

export interface UserSocket {
    id: string;
    tokenSession?: string;
    roomId: number;
}


const addUserToARoom = async (socket: Socket, { id, tokenSession, roomId }: UserSocket) => {

    let user: UserInstance | undefined | null;
    if(tokenSession && tokenSession !== 'undefined') {
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

const getRoomOfAUser = async (socketId: string) => {
    const userSocketController = await UserSocketController.getInstance();
    const roomController = await RoomController.getInstance();
    const userSocket = await userSocketController.getUserSocketBySocketId(socketId);
    if(userSocket === null) {
        return {
            error: 'userSocket doesn\'t exist'
        }
    }
    return roomController.getRoomOfAUserSocket(userSocket);
}

const getOtherUserInARoom = async (socketId: string, room: RoomInstance) => {
    const userSocketController = await UserSocketController.getInstance();
    return await userSocketController.getOtherUserInARoom(socketId, room);
}

const verifyUserAuthentified = async (roomId: number) => {
    const userSocketController = await UserSocketController.getInstance();
    const room = await userSocketController.room.findByPk(roomId);
    if(room ===  null)
        return false;
    return userSocketController.verifiyIfUsersSocketHaveUsers(room);
}

export {
    addUserToARoom,
    removeUser,
    getNumberOfUser,
    getUserWhoPlayInFirst,
    getRoomOfAUser,
    getOtherUserInARoom,
    verifyUserAuthentified
}
