import {UserController} from "../controllers/user.controller";
import {UserInstance} from "../models/user.model";
import {SessionInstance} from "../models/session.model";
import {PartInstance} from "../models/part.model";
import {PartController} from "../controllers/part.controller";

export class PartRepository {

    public static async getAPartIfTheUserPlayInIt(user: UserInstance, part: PartInstance): Promise<PartInstance | null> {
        const partController = await PartController.getInstance();
        return await partController.part.findOne({
            where: {
                id: part.id
            },
            include: [{
                model: partController.user,
                where: {
                    id: user.id
                }
            }]
        });
    }
}
