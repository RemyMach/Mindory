import {fixture} from "../fixture";
import {SequelizeManager} from "../../../models";
import {RoomPythonFixture} from "./roomPython.fixture";
import {UserSocketInstance} from "../../../models/userSocket.model";
import {UserFixture} from "../user.fixture";

export class UserSocketPythonFixture implements fixture{

    user_socket_1?: UserSocketInstance;
    user_socket_2?: UserSocketInstance;
    user_socket_3?: UserSocketInstance;
    user_socket_4?: UserSocketInstance;


    private static instance: UserSocketPythonFixture;

    public static async getInstance(): Promise<UserSocketPythonFixture> {
        if(UserSocketPythonFixture.instance === undefined) {
            UserSocketPythonFixture.instance = new UserSocketPythonFixture();
        }
        return UserSocketPythonFixture.instance;
    }

    private constructor() {};

    public async fillTable(): Promise<void> {
        const manager = await SequelizeManager.getInstance();
        const roomPythonFixture = await RoomPythonFixture.getInstance();
        const userFixture = await UserFixture.getInstance();

        this.user_socket_1 = await manager.userSocket.create({socketId: 'dtfgyuhijkolknjbhvgyhbjncsdwffds'});
        await this.user_socket_1.setRoom(roomPythonFixture.room_1);
        await this.user_socket_1?.setUser(userFixture.user_jean);
        await this.user_socket_1?.destroy();

        this.user_socket_2 = await manager.userSocket.create({socketId: 'fsdfsgkfgkosdpfojqfpffeff'});
        await this.user_socket_2.setRoom(roomPythonFixture.room_1);
        await this.user_socket_2?.setUser(userFixture.user_admin_rachel);
        await this.user_socket_2?.destroy();

        this.user_socket_3 = await manager.userSocket.create({socketId: 'dfjsfkqfdsfdsqdkspocjskdcojpsdc'});
        await this.user_socket_3.setRoom(roomPythonFixture.room_2);
        await this.user_socket_3?.setUser(userFixture.user_jean);
        await this.user_socket_3?.destroy();

        this.user_socket_4 = await manager.userSocket.create({socketId: 'poffdssfdofhiskpfdfsdfsdfjdsk'});
        await this.user_socket_4.setRoom(roomPythonFixture.room_2);
        await this.user_socket_4?.setUser(userFixture.user_admin_rachel);
        await this.user_socket_4?.destroy();
    }

    public async destroyFieldsTable(): Promise<void> {
        const manager = await SequelizeManager.getInstance();
        await manager.userSocket.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0');
        await manager.userSocket.destroy({
            truncate: true,
            force: true,
        });
    }
}

