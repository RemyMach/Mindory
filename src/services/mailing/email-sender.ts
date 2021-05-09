export type EmailSenderSendEmailArgs = {
    toEmail: string;
}

export type EmailSenderSendEmailResponse = {
    toEmail: string;
    status: 'success' | 'error';
}

export interface EmailSenderEmailApi {
    sendEmail: (args: EmailSenderSendEmailArgs) => Promise<EmailSenderSendEmailResponse>;
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

    async sendEmail(args: EmailSenderSendEmailArgs): Promise<EmailSenderSendEmailResponse> {
        this.validateEmailSender();
        return new Promise(resolve => resolve({toEmail: args.toEmail, status: 'success'}));
    }

    private validateEmailSender(): void {
        if(!this.isActive)
            throw new Error('EmailSender is not activate');

        if(!this.emailApi)
            throw new Error('EmailApi is not set');
    }

}
