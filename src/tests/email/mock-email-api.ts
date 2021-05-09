import {
    EmailSenderEmailApi,
    EmailSenderSendEmailArgs,
    EmailApiSendEmailResponse
} from "../../services/mailing/email-sender";

export const mockSendEmail = jest.fn();

export class MockEmailApi implements EmailSenderEmailApi {
    sendEmail(_args: EmailSenderSendEmailArgs): Promise<EmailApiSendEmailResponse> {
        return mockSendEmail();
    }
}
