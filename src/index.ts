import app from "./app";
import {EmailSender, NodemailerEmailApi} from "./services/mailing";

const port = process.env.PORT || 3000
const emailSender = EmailSender.getInstance();
emailSender.activate();
emailSender.setEmailApi(new NodemailerEmailApi());

app.listen(port, async () => {
    console.log('Server is up on port ' + port)
    await emailSender.sendSignUpVerificationEmail({toEmail: 'test@test.com'})
});
