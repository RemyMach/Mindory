import {CardInstance} from "../../models/card.model";
import {CardController} from "../../controllers/card.controller";

export async function getCardOfAPLayingDeck(cardIds: number[]): Promise<(CardInstance | null)[]> {
    const cardController = await CardController.getInstance();
    return await Promise.all<CardInstance | null>(
        cardIds.map((cardId: any) => cardController.card.findByPk(cardId))
    );
}
