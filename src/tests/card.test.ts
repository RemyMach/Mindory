import request from "supertest";
import app from "../app";
import {destroyTablesElement, fillTables} from "./fixtures";
import {SessionFixture} from "./fixtures/session.fixture";

beforeEach(async (done) => {
    await destroyTablesElement();
    await fillTables();
    done();
});

describe("Determine the card routes behavior", () => {
    beforeEach(async () => {
        const sessionFixture = await SessionFixture.getInstance();
        await sessionFixture.destroyFieldsTable();
        await sessionFixture.fillTable();
    });

    describe("Test to uploading a file", () => {

        const filePath = `${process.env.FILEDIRECTORY as string}python.png`;

        it('should create a card with no card Associate', async () => {

            const sessionFixture = await SessionFixture.getInstance();

            await request(app).post("/cards")
                .set('Authorization', `Bearer ${sessionFixture.session_user_admin?.token}`)
                .attach("image", filePath)
                .field("deckId", 1)
                .expect(201)
        })

        it('should create a card with a card Associate', async () => {
            const sessionFixture = await SessionFixture.getInstance();

            await request(app).post("/cards")
                .set('Authorization', `Bearer ${sessionFixture.session_user_admin?.token}`)
                .attach("image", filePath)
                .field("deckId", 1)
                .expect(201)
        })
    });
});
