import {DeckInstance} from "../models/deck.model";
import {DeckController} from "../controllers/deck.controller";
import {Sequelize} from "sequelize";
import {PartController} from "../controllers/part.controller";

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

    public static async getDeckWithCardsFromAPart(partId: number): Promise<DeckInstance | null> {
        const deckController = await DeckController.getInstance();
        const partController = await PartController.getInstance();
        return await deckController.deck.findOne({
            include: [{
                attributes: ['id'],
                model: partController.part,
                where: {
                    id: partId
                },
                include: [{
                    model: partController.card
                }]
            }]
        })
    }

    public static async deleteDeckById(deckId: number): Promise<void>
    {
        const deckController = await DeckController.getInstance();
        await deckController.deck.destroy({
            where: {
                id: deckId
            }
        });
    }
}
