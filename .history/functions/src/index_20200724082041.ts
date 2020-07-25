import * as firebase from 'firebase';
import * as functions from 'firebase-functions';
const nodemailer = require("nodemailer");
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

// 送信に使用するメールサーバーの設定 環境変数 hinokichi
  const mailTransport = nodemailer.createTransport({
    service: "gmail",
    secure: false, 
    port: 25,
    auth: {
      user: gmailEmail,
      pass: gmailPassword
    }
  });

// 管理者用のメールテンプレート→uresMail text
  const text = data => {
    return `${data.title}締め切り1日前です。
    TODO：
    ${data.title}
  
    詳細はこちらから
    todoapp-8da1b.firebaseapp.com
    `;
  };

  exports.sendMail = firebase.functions().https.onCall(async (data, context) => {
    // メール設定userMail
    let userMail = {
      from: gmailEmail,//hinokichi
      to: data.userMail,//userEmail
      subject: `${data.title}の締切1日前です`,//todoTitle
      text: text(data)
    };
    try {
      await mailTransport.sendMail(userMail);
     } catch (e) {
      console.error(`send failed. ${e}`);
      throw new functions.https.HttpsError('internal', 'send failed');
     }
    });

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
