import {CardInstance} from "../models/card.model";
import {DeckInstance} from "../models/deck.model";
import {DeckController} from "../controllers/deck.controller";
import {Sequelize} from "sequelize";

export class DeckRepository {

    public static async getAllCardOfADeck(deck: DeckInstance): Promise<DeckInstance| null> {
        const deckController = await DeckController.getInstance();
        return  await deckController.deck.findOne({
            attributes: ['id', 'title', 'image'],
            order: Sequelize.literal('id'),
            where: {
                id: deck.id
            },
            include: [
                {
                    model: deckController.card,
                    attributes: ['id', 'image', 'text'],
                    include: [{
                        model: deckController.card,
                        attributes: ['id', 'image', 'text'],
                        as: "cardAssociate"
                    }]
                }]
        });
    }

    public static async getADeckForPlaying(deck: DeckInstance): Promise<DeckInstance | null> {
        const deckController = await DeckController.getInstance();
        return  await deckController.deck.findOne({
            attributes: ['id', 'title', 'image'],
            order: Sequelize.literal('rand()'),
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
