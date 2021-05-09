import {
    EmailSenderEmailApi,
    EmailSenderSendEmailArgs,
    EmailApiSendEmailResponse
} from "../../services/mailing/email-sender";

export class MockEmailApi implements EmailSenderEmailApi {
    sendEmail({toEmail}: EmailSenderSendEmailArgs): Promise<EmailApiSendEmailResponse> {
        return new Promise((resolve) =>
            resolve({toEmail, status: 'success'}));
    }

}
