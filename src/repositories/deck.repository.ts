import {CardInstance} from "../models/card.model";
import {DeckInstance} from "../models/deck.model";
import {DeckController} from "../controllers/deck.controller";
import {Sequelize} from "sequelize";

export class DeckRepository {

    public static async getAllCardOfADeck(deck: DeckInstance): Promise<DeckInstance| null> {
        const deckController = await DeckController.getInstance();
        return  await deckController.deck.findOne({
            attributes: ['id', 'title'],
            where: {
                id: deck.id
            },
            include: [
                {
                    model: deckController.card,
                    attributes: ['id', 'image', 'text'],
                    include: [{
                        model: deckController.card,
                        attributes: ['id'],
                        as: "cardAssociate"
                    }]
                }]
        });
    }

    public static async getADeckForPlaying(deck: DeckInstance, numberOfCard: number): Promise<DeckInstance | null> {
        const deckController = await DeckController.getInstance();
        return  await deckController.deck.findOne({
            attributes: ['id', 'title'],
            order: Sequelize.literal('rand()'),
            limit: numberOfCard,
            where: {
                id: deck.id
            },
            include: [
                {
                    model: deckController.card,
                    attributes: ['id', 'image', 'text'],
                    include: [{
                        model: deckController.card,
                        attributes: ['id'],
                        as: "cardAssociate"
                    }]
                }]
        });
    }

}
