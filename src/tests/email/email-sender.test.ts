import {EmailSender} from "../../services/mailing";
import {MockEmailApi, mockResetPasswordEmail} from "./mock-email-api";
import {EmailApiSendResetPasswordEmailArgs} from "../../services/mailing/types";

const sendResetPasswordArgs = {
    toEmail: 'test@test.com',
    emailVerificationToken: 'whatever',
};

beforeEach( async () => {
    EmailSender.resetEmailSenderInstance();
});

it('should throw an error if the email server is deactivated', async () => {
    const emailSender = EmailSender.getInstance();
    emailSender.deactivate();
    await expect(emailSender.sendResetPasswordEmail({toEmail: 'test@test.com'})).rejects.toThrowError('EmailSender is not activate');
});

it('should throw an error when sending an email if the email api is not set', async() => {
    const emailSender = EmailSender.getInstance();
    emailSender.activate();
    await expect(emailSender.sendResetPasswordEmail({toEmail: 'test@test.com'})).rejects.toThrowError('EmailApi is not set');
});


it('should send the reset password email if the sender is active and the EmailApi is set', async () => {
    const emailSender = EmailSender.getInstance();
    const mockEmailApi = new MockEmailApi();

    emailSender.activate();
    emailSender.setEmailApi(mockEmailApi);

    const res = await emailSender.sendResetPasswordEmail(
        sendResetPasswordArgs
    );
    expect(res.toEmail).toEqual('test@test.com');
    expect(mockResetPasswordEmail).toHaveBeenCalledTimes(1);
});
