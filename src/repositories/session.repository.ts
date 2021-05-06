import {UserController} from "../controllers/user.controller";
import {UserInstance} from "../models/user.model";
import {SessionInstance} from "../models/session.model";

export class SessionRepository {

    public static async getAllSessionsFromAUser(user: UserInstance): Promise<SessionInstance[] | null> {
        const userController = await UserController.getInstance();
        return await userController.session.findAll({
            include: [{
                model: userController.user,
                where: {
                    email: user.email
                }
            }]
        });
    }

    public static async deleteSessionsFromAUser(user: UserInstance): Promise<void | null> {
        const userController = await UserController.getInstance();

        const sessions = await this.getAllSessionsFromAUser(user);
        if(sessions === null) {
            return null;
        }

        const session_string = sessions.reduce((acc, element) => (acc + "," + element.id), "").slice(1);

        await userController.session.destroy({
            where: {
                id: session_string
            }
        })
    }
}
