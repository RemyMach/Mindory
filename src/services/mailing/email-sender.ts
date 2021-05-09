export type EmailApiSendEmailArgs = {
    toEmail: string;
}

export type EmailApiSendEmailResponse = {
    toEmail: string;
    status: 'success' | 'error';
}

export interface EmailSenderEmailApi {
    sendSignUpVerificationEmail: (args: EmailApiSendEmailArgs) => Promise<EmailApiSendEmailResponse>;
}

export class EmailSender implements EmailSenderEmailApi{
    private isActive = false;
    private static emailSenderInstance: EmailSender;
    private emailApi: EmailSenderEmailApi | undefined;

    static getInstance() {
        if (!this.emailSenderInstance) {
            this.emailSenderInstance = new EmailSender();
        }

        return this.emailSenderInstance;
    }

    private constructor() {

    }
    deactivate(): void {
        this.isActive = false;
    }

    activate(): void {
        this.isActive = true;
    }

    setEmailApi(emailApi: EmailSenderEmailApi): void {
        this.emailApi = emailApi;
    }

    async sendSignUpVerificationEmail(args: EmailApiSendEmailArgs): Promise<EmailApiSendEmailResponse> {
        this.validateEmailSender();
        return this.emailApi!.sendSignUpVerificationEmail(args);
    }

    private validateEmailSender(): void {
        if(!this.isActive)
            throw new Error('EmailSender is not activate');

        if(!this.emailApi)
            throw new Error('EmailApi is not set');
    }

}
