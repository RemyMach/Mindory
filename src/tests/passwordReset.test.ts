import {destroyTablesElement, fillTables} from "./fixtures";
import request from "supertest";
import app from "../app";
import {UserRepository} from "../repositories/user.repository";
import {MockEmailApi} from "./email/mock-email-api";
import {EmailSender} from "../services/mailing";
import { Sequelize } from "sequelize/types";
import { SequelizeManager } from "../models";

jest.setTimeout(10000);

beforeEach(async (done) => {
    await destroyTablesElement();
    await fillTables();
    const emailSender = EmailSender.getInstance();
    const mockEmailApi = new MockEmailApi();

    emailSender.activate();
    emailSender.setEmailApi(mockEmailApi);
    done();
});

afterAll(async (done) => {
	console.log("on passe ici");
	(await SequelizeManager.getInstance()).sequelize.close();
	console.log("connection fermé");
	done();
});

describe('Determine the password Reset routes behavior', () => {

    describe('Test the reset of a password', () => {


        it('should return 202 because the email doesn\'t exist in the db but the user doesn\'t have to know that', async (done) => {
            const response = await request(app).post('/passwordReset')
                .send({
                    email: 'pomme@pomui.com',
                }).expect(202);
			console.log("test");
			done();
        });

        it('should return 202 because the email exist but the user doesn\'t have to know it', async (done) => {
            const user = await UserRepository.getUserByEmail('eric@gmail.com');
            expect(await user?.getPassword_Resets()).toHaveLength(0);

            const response = await request(app).post('/passwordReset')
                .send({
                    email: 'eric@gmail.com',
                }).expect(202);

            expect(await user?.getPassword_Resets()).toHaveLength(1);
			console.log("test 1");
			done();
        });

        it('should return 202 when the email is not fill because the user doesn\'t have to know how to do this request', async (done) => {
            const response = await request(app).post('/passwordReset')
                .send({
                }).expect(202);
			console.log("test 2");
			done();

        });

        it('should return 202 and add 2 token but always have one for the user , the latest add', async (done) => {
             await request(app).post('/passwordReset')
                .send({
                    email: 'eric@gmail.com',
                }).expect(202);

            const user = await UserRepository.getUserByEmail('eric@gmail.com');
            const passwordResetRequestOne = await user?.getPassword_Resets();
            expect(passwordResetRequestOne).toHaveLength(1);

             await request(app).post('/passwordReset')
                .send({
                    email: 'eric@gmail.com',
                }).expect(202);

            const passwordResetRequestTwo = await user?.getPassword_Resets();
            expect(passwordResetRequestTwo).toHaveLength(1);

            //the first token has been deleted when the second has been add
            expect(passwordResetRequestOne).not.toEqual(passwordResetRequestTwo);
			console.log("test 3");
			done();
        });
    });
});
