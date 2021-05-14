import {
    EmailApiSendEmailArgs,
    EmailApiSendEmailResponse,
    EmailApi, EmailApiSendResetPasswordEmailArgs
} from "../../services/mailing/types";


export const mockResetPasswordEmail = jest.fn(
    (toEmail: string): Promise<EmailApiSendEmailResponse> =>
        new Promise((resolve) => resolve({ toEmail, status: 'success' }))
);

export class MockEmailApi implements EmailApi {
    sendResetPasswordEmail({toEmail}: EmailApiSendResetPasswordEmailArgs): Promise<EmailApiSendEmailResponse> {
        return mockResetPasswordEmail(toEmail);
    }
}
