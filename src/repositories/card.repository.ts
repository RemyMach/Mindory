import {CardInstance} from "../models/card.model";
import {CardController} from "../controllers/card.controller";
import {DeckInstance} from "../models/deck.model";
import {Op} from "sequelize";

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

}
