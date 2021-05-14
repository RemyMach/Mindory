import {
    EmailApiSendEmailArgs,
    EmailApiSendEmailResponse, EmailApi
} from "./types";
import mailjet, {Email} from 'node-mailjet';

export type BuildEmailResetPasswordArgs = {
    emailVerificationLink: string;
};

export type BuildLinkResetPasswordArgs = {
    emailVerificationToken: string;
};

export class MailjetApi implements EmailApi{

    private transporter: Email.Client;

    constructor() {

        this.transporter = mailjet.connect(process.env.SMTP_APIKEY_PUBLIC as string, process.env.SMTP_APIKEY_PRIVATE as string);
    }

    protected async sendEmail(args: EmailApiSendEmailArgs): Promise<void> {
        const {toEmail, subject, textBody, htmlBody} = args;
        const res = await this.transporter.post("send", {'version': 'v3.1'})
            .request({
                "Messages":[
                    {
                        "From": {
                            "Email": process.env.MAIL_SENDER,
                            "Name": process.env.MAIL_SENDER_NAME
                        },
                        "To": [
                            {
                                "Email": toEmail,
                            }
                        ],
                        "Subject": subject,
                        "TextPart": textBody,
                        "HTMLPart": htmlBody,
                    }]
        });
        console.log(res);
    }

    async sendResetPasswordEmail(args: EmailApiSendEmailArgs): Promise<EmailApiSendEmailResponse> {
        const {toEmail, tokenGenerate} = args;
        if(!tokenGenerate) {
            return {
                toEmail: toEmail,
                status: 'error'
            }
        }
        const emailVerificationLink = this.buildEmailVerificationLink({
            emailVerificationToken: tokenGenerate,
        });
        const subject = 'Hi it\'s Mindory! Password reset';
        const textBody = this.buildResetPasswordEmailTextBody({
            emailVerificationLink,
        });
        const htmlBody = this.buildResetPasswordEmailHtmlBody({
            emailVerificationLink,
        });
        await this.sendEmail({toEmail, subject, textBody, htmlBody});
        return {
            toEmail: toEmail,
            status: 'success'
        }
    }

    private buildResetPasswordEmailTextBody(args: BuildEmailResetPasswordArgs) {
        const { emailVerificationLink } = args;

        return `Welcome to Mindory, the coolest app to play and learn! Please click on the link below (or copy it to your browser) to reset your password. ${emailVerificationLink}`;
    }

    private buildResetPasswordEmailHtmlBody(args: BuildEmailResetPasswordArgs) {
        const { emailVerificationLink } = args;

        return `
        <h1>Welcome to Mindory</h1>
        <br/>
        the coolest app to play and learn!
        <br/>
        <br/>
        Please click on the link below (or copy it to your browser) to reset your password:
        <br/>
        <br/>
        <a href="${emailVerificationLink}">${emailVerificationLink}</a>`;
    }

    private buildEmailVerificationLink = (
        args: BuildLinkResetPasswordArgs
    ): string => {
        const { emailVerificationToken } = args;

        // TODO: this url will change once we integrate kubernetes in our application
        return `http://localhost:3000/passwordReset/${emailVerificationToken}`;
    };

}
