import {UserController} from "../controllers/user.controller";
import {UserInstance} from "../models/user.model";
import {SessionInstance} from "../models/session.model";
import {PartInstance} from "../models/part.model";
import {PartController} from "../controllers/part.controller";
import {CardInstance} from "../models/card.model";

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

    public static async getAllValidPairPlay2( part: PartInstance): Promise<PartInstance | null> {
        const partController = await PartController.getInstance();
        return await partController.part.findOne({
            where: {
                id: part.id
            },
            include: [{
                model: partController.shot,
                where: {
                    isValid: true
                },
                include: [{
                    model: partController.card
                }]
            }]
        });
    }

    public static async getAllValidPairPlay( part: PartInstance): Promise<CardInstance[] | null> {
        const partController = await PartController.getInstance();
        return await partController.card.findAll({
            include: [{
                required: true,
                model: partController.shot,
                where: {
                    isValid: true
                },
                include: [{
                    required: true,
                    model: partController.part,
                    where: {
                        id: part.id
                    }
                }]
            }]
        });
    }
}
