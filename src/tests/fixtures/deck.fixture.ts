import {SequelizeManager} from "../../models";
import {RoleInstance} from "../../models/role.model";
import {fixture} from "./fixture";
import {CardInstance} from "../../models/card.model";
import {DeckInstance} from "../../models/deck.model";

export class DeckFixture implements fixture{

    deck_python?: DeckInstance;
    deck_linux?: DeckInstance;
    deck_html?: DeckInstance;


    private static instance: DeckFixture;

    public static async getInstance(): Promise<DeckFixture> {
        if(DeckFixture.instance === undefined) {
            DeckFixture.instance = new DeckFixture();
        }
        return DeckFixture.instance;
    }

    private constructor() {};

    public async fillTable(): Promise<void> {
        const manager = await SequelizeManager.getInstance();

        await Promise.all([
            this.deck_python = await manager.deck.create({
                image: "python.png",
                title: "Python"
            }),
            this.deck_linux = await manager.deck.create({
                image: "logo-linux.png",
                title: "Linux"
            }),
            this.deck_html = await manager.deck.create({
                image: "html-5.png",
                title: "html"
            })
        ])
    }

    public async destroyFieldsTable(): Promise<void> {
        const manager = await SequelizeManager.getInstance();
        await manager.deck.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0');
        await manager.deck.destroy({
            truncate: true,
            force: true
        });
    }
}
