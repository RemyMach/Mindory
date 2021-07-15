import {CardInstance} from "../models/card.model";
import {CardController} from "../controllers/card.controller";
import {DeckInstance} from "../models/deck.model";
import {PartInstance} from "../models/part.model";
import {PartController} from "../controllers/part.controller";
import {UserInstance} from "../models/user.model";

export class CardRepository {

    public static async getCardIfNotAlreadyPairedWithAnOther(cardId: number, deck: DeckInstance): Promise<CardInstance | null> {
        const cardController = await CardController.getInstance();
        const card = await cardController.card.findOne({
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

        if (card === null)
            return null;

        const cardValid = await card.getCardAssociate();
        return cardValid === null ? card : null;
    }

    public static async getAllCardsPlayDuringThePart(part: PartInstance): Promise<CardInstance[] | null> {
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

    public static async getAllCardsOfAPart(part: PartInstance): Promise<CardInstance[] | null> {
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

    public static async deleteCardById(cardId: number): Promise<void> {
        const cardController = await CardController.getInstance();
        await cardController.card.destroy({
            where: {
                id: cardId
            }
        });
    }

    public static async getAllValidCardsPlayInAPart(part: PartInstance): Promise<CardInstance[]> {
        const cardController = await CardController.getInstance();
        const partController = await PartController.getInstance();
        return await cardController.card.findAll({
            attributes: ['id'],
            include: [{
                attributes: ['id'],
                model: partController.shot,
                where: {
                    is_valid: 1
                },
                include: [{
                    attributes: ['id'],
                    model: partController.part,
                    where: {
                        id: part.id
                    }
                }]
            }]
        })
    }

    public static async getAllValidCardsForAUser(part: PartInstance, user: UserInstance): Promise<CardInstance[]> {
        const cardController = await CardController.getInstance();
        const partController = await PartController.getInstance();
        return await cardController.card.findAll({
            include: [{
                model: partController.shot,
                where: {
                    is_valid: 1
                },
                include: [{
                    model: partController.part,
                    where: {
                        id: part.id
                    }
                }, {
                    model: partController.user,
                    where: {
                        id: user.id
                    }
                }]
            }]
        })
    }
}
