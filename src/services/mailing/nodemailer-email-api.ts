import {
    EmailApiSendEmailArgs,
    EmailApiSendEmailResponse, EmailApi
} from "./types";
import nodemailer from 'nodemailer';
import Mail from "nodemailer/lib/mailer";
import {BuildEmailResetPasswordArgs, BuildLinkResetPasswordArgs} from "./mailjet-api";

export class NodemailerEmailApi implements EmailApi{

    private transporter: Mail;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'localhost',
            port: 1025,
            auth: {
                user: 'project.1',
                pass: 'secret.1'
            }
        });
    }

    protected async sendEmail(args: EmailApiSendEmailArgs): Promise<void> {
        const {toEmail, subject, textBody, htmlBody} = args;
        await this.transporter.sendMail({
            from: 'Unsocial App <noreply@unsocial.app>',
            to: toEmail,
            subject,
            text: textBody,
            html: htmlBody,
        });
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
