import { injectable, Service } from 'chen/core';

const mandrill_api = require('mandrill-api/mandrill');

@injectable
export class MandrillService extends Service {
  private mandrill;

  client() {
    if (!this.mandrill) {
      console.log('not mandrill');
      this.mandrill = new mandrill_api.Mandrill('r3xUNUS6dLsJ2N5RdK4GYA');
    }
    return this.mandrill;
  }

  send(subject, message, toEmail, fromEmail) {

    if (!fromEmail) {
      fromEmail = 'noreply@mashgraph.com';//this.context.app.getConfig().get('util.mandrill.from');
    }

    let msg = {
      html: message,
      subject,
      from_email: fromEmail,
      to: toEmail
    };

    return this.client().messages.send({ message: msg, async: true });
  }

  test(msg){
    return true;
  }
}
