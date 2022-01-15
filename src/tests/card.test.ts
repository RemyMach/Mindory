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

        const filePath = `${process.env.FILE_DIRECTORY as string}python.png`;

        it('should return 400 because deck doesn\'t exist', async () => {

            const sessionFixture = await SessionFixture.getInstance();

            await request(app).post("/cards")
                .set('Authorization', `Bearer ${sessionFixture.session_user_admin?.token}`)
                .attach("image", filePath)
                .field("deckId", 1200)
                .expect(400)
        })
        it('should return 400 because text and image are not filled', async () => {

            const sessionFixture = await SessionFixture.getInstance();

            await request(app).post("/cards")
                .set('Authorization', `Bearer ${sessionFixture.session_user_admin?.token}`)
                .field("deckId", 1200)
                .expect(400)
        })

        it('should return 400 because deckId is not fill', async () => {

            const sessionFixture = await SessionFixture.getInstance();

            await request(app).post("/cards")
                .set('Authorization', `Bearer ${sessionFixture.session_user_admin?.token}`)
                .attach("image", filePath)
                .field("deckId", 1200)
                .expect(400)
        })

        it('should return 400 because cardAssociate have already a card associate', async () => {

            const sessionFixture = await SessionFixture.getInstance();

            await request(app).post("/cards")
                .set('Authorization', `Bearer ${sessionFixture.session_user_admin?.token}`)
                .attach("image", filePath)
                .field("deckId", 1)
                .field("cardAssociateId", 3)
                .expect(400)
        })

        it('should create a card with no card Associate and an image', async () => {

            const sessionFixture = await SessionFixture.getInstance();

            await request(app).post("/cards")
                .set('Authorization', `Bearer ${sessionFixture.session_user_admin?.token}`)
                .attach("image", filePath)
                .field("deckId", 1)
                .expect(201)
        })
        it('should create a card with a card Associate and an image', async () => {
            const sessionFixture = await SessionFixture.getInstance();

            await request(app).post("/cards")
                .set('Authorization', `Bearer ${sessionFixture.session_user_admin?.token}`)
                .attach("image", filePath)
                .field("deckId", 1)
                .field("cardAssociateId", 2)
                .expect(201)
        })


        it('should create a card with no card associate and a text', async () => {
            const sessionFixture = await SessionFixture.getInstance();

            await request(app).post("/cards")
                .set('Authorization', `Bearer ${sessionFixture.session_user_admin?.token}`)
                .field("text", "je suis un test")
                .field("deckId", 1)
                .field("cardAssociateId", 2)
                .expect(201)
        })

        it('should create a card with a card Associate and a text', async () => {
            const sessionFixture = await SessionFixture.getInstance();

            await request(app).post("/cards")
                .set('Authorization', `Bearer ${sessionFixture.session_user_admin?.token}`)
                .field("text", "je suis un test")
                .field("deckId", 1)
                .field("cardAssociateId", 2)
                .expect(201)
        })
    });
});
