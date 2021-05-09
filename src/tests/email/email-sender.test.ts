import {EmailSender} from "../../services/mailing";
import {MockEmailApi} from "./mock-email-api";

it('should throw an error if the email server is deactivated', async () => {
    const emailSender = EmailSender.getInstance();
    emailSender.deactivate();
    await expect(emailSender.sendEmail({toEmail: 'test@test.com'})).rejects.toThrowError('EmailSender is not activate');
});

it('should throw an error when sending an email if the email api is not set', async() => {
    const emailSender = EmailSender.getInstance();
    emailSender.activate();
    await expect(emailSender.sendEmail({toEmail: 'test@test.com'})).rejects.toThrowError('EmailApi is not set');
});

it('should send the email correctly if the EmailSender is active and the EmailApi is set', async() => {
    const emailSender = EmailSender.getInstance();
    const mockEmailApi = new MockEmailApi();
    emailSender.activate();
    emailSender.setEmailApi(mockEmailApi);

    const res = await emailSender.sendEmail({toEmail: 'test@test.fr'});
    expect(res.toEmail).toEqual('test@test.fr');
});
