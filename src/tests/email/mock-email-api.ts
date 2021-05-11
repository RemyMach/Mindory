import {
    IEmailSender,
    EmailApiSendEmailArgs,
    EmailApiSendEmailResponse, EmailSenderEmailApi
} from "../../services/mailing/types";

export const mockSendSignUpVerificationEmail = jest.fn((toEmail: string): Promise<EmailApiSendEmailResponse> => {
    return new Promise((resolve) => resolve({toEmail, status: 'success'}));
});
export const mockSendEmail = jest.fn();

export class MockEmailApi extends EmailSenderEmailApi {
    sendSignUpVerificationEmail({toEmail}: EmailApiSendEmailArgs): Promise<EmailApiSendEmailResponse> {
        this.sendEmail({toEmail});
        return mockSendSignUpVerificationEmail(toEmail);
    }
    protected sendEmail(args: EmailApiSendEmailArgs): void {
        mockSendEmail();
    }
}
