import {EmailSender} from "../../services/mailing";

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
