import {CardInstance} from "../models/card.model";
import {CardController} from "../controllers/card.controller";

export class CardRepository {

    public static async getCardIfNotAlreadyPairedWithAnOther(cardId: number): Promise<CardInstance| null> {
        const cardController = await CardController.getInstance();
        return await cardController.card.findOne({
            where: {
                id: cardId
            },
            include: [{
                model: cardController.card,
                where: {
                    id: null
                }
            }]
        });
    }

}
