import {
    IEmailSender,
    EmailApiSendEmailArgs,
    EmailApiSendEmailResponse, EmailSenderEmailApi
} from "./types";
import nodemailer from 'nodemailer';
import Mail from "nodemailer/lib/mailer";

export class NodemailerEmailApi extends EmailSenderEmailApi{

    private transporter: Mail;

    constructor() {
        super();
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
        const {toEmail} = args;
        const res = await this.transporter.sendMail({
            from: 'noreply@unsocial.app',
            to: toEmail,
            subject: 'My first email',
            text: 'this is our first test email'
        });
        console.log(res);
    }

    async sendSignUpVerificationEmail(args: EmailApiSendEmailArgs): Promise<EmailApiSendEmailResponse> {
        const {toEmail} = args;
        await this.sendEmail({toEmail});
        return {
            toEmail: 'test@test.com',
            status: 'success'
        }
    }

}
