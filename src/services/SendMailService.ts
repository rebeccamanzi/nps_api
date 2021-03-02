import nodemailer, { Transporter } from 'nodemailer';
import { SendMailController } from '../controllers/SendMailController';

class SendMailService {
  private client: Transporter
  // constructor -> 1ª função a ser executada quando chamar a classe
  // then() , pois constructor não aceita async/await
  constructor() {
      nodemailer.createTestAccount().then(account => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
              user: account.user,
              pass: account.pass
          }
      });

      this.client = transporter;

    })
  }

  async execute(to: string, subject: string, body: string) {
    const message = await this.client.sendMail({
      to,
      subject,
      html: body,
      from: "NPS <noreplay@nps.com.br>"
    });

    console.log('Message sent: %s', message.messageId);    
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

export default new SendMailService();