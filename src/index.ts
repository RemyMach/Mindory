import app from "./app";
import {EmailSender, NodemailerEmailApi} from "./services/mailing";
import {MailjetApi} from "./services/mailing/mailjet-api";

const port = process.env.PORT || 3000
const emailSender = EmailSender.getInstance();
emailSender.activate();
emailSender.setEmailApi(new MailjetApi());

app.listen(port, async () => {
    console.log('Server is up on port ' + port);
    //await emailSender.sendResetPasswordEmail({toEmail: 'remygt@hotmail.fr'});
});
