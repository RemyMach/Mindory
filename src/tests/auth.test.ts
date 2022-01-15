import {destroyTablesElement, fillTables} from "./fixtures";
import app from '../app';
import {SessionFixture} from "./fixtures/session.fixture";
import request from "supertest";
import {MailjetApi} from "../services/mailing/mailjet-api";
import {EmailSender, NodemailerEmailApi} from "../services/mailing";

beforeEach(async (done) => {
    await destroyTablesElement();
    await fillTables();
    done();
});
describe('Determine the auth routes behavior', () => {

    describe('Test the creation of a user', () => {


        it('should return 400 because the username is taken in the db', async () => {
            const response = await request(app).post('/auth/subscribe')
                .send({
                    name: 'remy',
                    surname: "pomme",
                    email: 'remy@example.com',
                    password: "azertyuiop",
                    username: "jean"
                }).expect(400);

        });

        it('should return 400 because the email is taken in the db', async () => {
            const response = await request(app).post('/auth/subscribe')
                .send({
                    name: 'remy',
                    surname: "pomme",
                    email: 'margaux.prodic@gmail.com',
                    password: "azertyuiop",
                    username: "jean"
                }).expect(400);

        });

        it('should  work because the user doesn\'t exist in the db', async () => {

            await request(app).post('/auth/subscribe')
                .send({
                    name: 'remy',
                    surname: "pomme",
                    email: 'remy@example.com',
                    password: "azertyuiop",
                    username: "remac"
                }).expect(201);
        });

        it('should not work because a param is missing in the request', async () => {

            await request(app).post('/auth/subscribe')
                .send({
                    name: 'remy',
                    surname: "pomme",
                    password: "azertyuiop",
                    username: "tom"
                }).expect(400);
        });
    });

    describe("test the login of a user", () => {

        it('should return 400 because the password is not correct', async () => {

            await request(app).post('/auth/login')
                .send({
                    email: "rachel@notime.com",
                    password: "azertyuiopo"
                }).expect(400);
        });


        it('should return 200 work because good email and password', async () => {

            await request(app).post('/auth/login')
                .send({
                    email: "rachel@notime.com",
                    password: "azertyuiop"
                }).expect(200);
        });

        it('should return 400 because bad username doesn\'t exist', async () => {

            await request(app).post('/auth/login')
                .send({
                    password: "azertyuiop",
                    email: "jean261"
                }).expect(400);
        });

        it('should return 400 because email is not fill', async () => {

            await request(app).post('/auth/login')
                .send({
                    password: "azertyuiop",
                }).expect(400);
        });

        it('should return 400 because password is not fill', async () => {

            await request(app).post('/auth/login')
                .send({
                    password: "azertyuiop",
                }).expect(400);
        });
    });


    describe("test the logout of a user", () => {
        beforeEach(async () => {
            const sessionFixture = await SessionFixture.getInstance();
            await sessionFixture.destroyFieldsTable();
            await sessionFixture.fillTable();
        });

        it('should return 200 because the token correspond to a user', async () => {
            const sessionFixture = await SessionFixture.getInstance();

            await request(app).delete('/auth/logout')
                .set('Authorization', `Bearer ${sessionFixture.session_user_admin?.token}`)
                .send().expect(200, {"message": "the token has been deleted"});
        });

        it('should return 403 because the token doesn\'t exist', async () => {
            const sessionFixture = await SessionFixture.getInstance();

            await request(app).delete('/auth/logout')
                .set('Authorization', `Bearer fdsfsdfsd`)
                .send().expect(403);
        });

        it('should return 401 because the token is doesn\'t fill', async () => {
            const sessionFixture = await SessionFixture.getInstance();

            await request(app).delete('/auth/logout')
                .send().expect(401);
        });
    });

});


