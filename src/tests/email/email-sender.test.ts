import {EmailSender} from "../../services/mailing";
import {MockEmailApi, mockSendSignUpVerificationEmail} from "./mock-email-api";

it('should throw an error if the email server is deactivated', async () => {
    const emailSender = EmailSender.getInstance();
    emailSender.deactivate();
    await expect(emailSender.sendSignUpVerificationEmail({toEmail: 'test@test.com'})).rejects.toThrowError('EmailSender is not activate');
});

it('should throw an error when sending an email if the email api is not set', async() => {
    const emailSender = EmailSender.getInstance();
    emailSender.activate();
    await expect(emailSender.sendSignUpVerificationEmail({toEmail: 'test@test.com'})).rejects.toThrowError('EmailApi is not set');
});


it('should send the signup verification email if the sender is active and the EmailApi is set', async() => {
    const emailSender = EmailSender.getInstance();
    const mockEmailApi = new MockEmailApi();
    emailSender.activate();
    emailSender.setEmailApi(mockEmailApi);

     await emailSender.sendSignUpVerificationEmail({toEmail: 'test@test.fr'});
    expect(mockSendSignUpVerificationEmail).toHaveBeenCalledTimes(1);
});
