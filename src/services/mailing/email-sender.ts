import {EmailApiSendEmailResponse, EmailApi, EmailApiSendResetPasswordEmailArgs} from "./types";

export class EmailSender implements EmailApi{
    private isActive = false;
    private static emailSenderInstance: EmailSender;
    private emailApi: EmailApi | undefined;

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

    static resetEmailSenderInstance(): void {
        this.emailSenderInstance = new EmailSender();
    }

    setEmailApi(emailApi: EmailApi): void {
        this.emailApi = emailApi;
    }

    async sendResetPasswordEmail(args: EmailApiSendResetPasswordEmailArgs): Promise<EmailApiSendEmailResponse> {
        this.validateEmailSender();
        return this.emailApi!.sendResetPasswordEmail(args);
    }

    private validateEmailSender(): void {
        if(!this.isActive)
            throw new Error('EmailSender is not activate');

        if(!this.emailApi)
            throw new Error('EmailApi is not set');
    }

}
