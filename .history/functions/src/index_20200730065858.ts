import * as firebase from 'firebase';
import * as functions from 'firebase-functions';
const nodemailer = require("nodemailer");
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const currentUser = firebase.auth().currentUser!;

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
  const text = (data: any[]) => {
    return `$締切1日前のTODO一覧
    TODO：
    ${data}
  
    詳細はこちらから
    todoapp-8da1b.firebaseapp.com
    `;
  };

  exports.sendMail = functions.https.onCall(async (data: any[], context: any) => {
    // メール設定userMail
    let userMail = {
      from: gmailEmail,//hinokichi
      to: currentUser.email!,//userEmail
      subject: `$TODO締切1日前のお知らせ`,//todoTitle
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
