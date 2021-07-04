import {CardInstance} from "../models/card.model";
import {CardController} from "../controllers/card.controller";
import {DeckInstance} from "../models/deck.model";
import {Op} from "sequelize";
import {PartInstance} from "../models/part.model";
import {PartController} from "../controllers/part.controller";

export class CardRepository {

    public static async getCardIfNotAlreadyPairedWithAnOther(cardId: number, deck: DeckInstance): Promise<CardInstance| null> {
        const cardController = await CardController.getInstance();
        const card =  await cardController.card.findOne({
            where: {
                id: cardId
            },
            include: [
                {
                    required: true,
                    model: cardController.deck,
                    where: {
                        id: deck.id
                    }
                }]
        });

        if(card === null)
            return null;

        const cardValid = await card.getCardAssociate();
        return cardValid ===  null ? card: null;
    }

    public static async getAllCardsPlayDuringThePart( part: PartInstance): Promise<CardInstance[] | null> {
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

    public static async getAllCardsOfAPart( part: PartInstance): Promise<CardInstance[] | null> {
        const partController = await PartController.getInstance();
        return await partController.card.findAll({
            include: [{
                required: true,
                model: partController.part,
                where: {
                    id: part.id
                }
            }]
        });
    }

}
