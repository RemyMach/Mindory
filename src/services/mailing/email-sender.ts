import {EmailApiSendEmailArgs, EmailApiSendEmailResponse, IEmailSender, EmailSenderEmailApi} from "./types";

export class EmailSender implements IEmailSender{
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

    static resetEmailSenderInstance(): void {
        this.emailSenderInstance = new EmailSender();
    }

    setEmailApi(emailApi: EmailSenderEmailApi): void {
        this.emailApi = emailApi;
    }

    async sendSignUpVerificationEmail(args:EmailApiSendEmailArgs): Promise<EmailApiSendEmailResponse> {
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
