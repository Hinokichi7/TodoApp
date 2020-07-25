const firebase = require("firebase");
const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const nodemailer = require("nodemailer");
const { use } = require("vue/types/umd");
const SendmailTransport = require("nodemailer/lib/sendmail-transport");

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const credentialsJson = require("./credentials.json");
const tokenJson = require("./token.json");
const { email } = require("vuelidate/lib/validators");

  exports.sendMail = functions.https.onCall(async (data, context) => {
    // メール情報の作成
    const auth = createAuth(credentialsJson, tokenJson);
    const gmail = google.gmail({ version: "v1", auth });
    const email = createEmail(data);

    // メール送付
    try {
      gmail.users.messages.send({
        userId: "me",
        resource: {
          raw: email,
        },
      });
    } catch (err) {
      console.error(`send failed. ${err}`);
      throw new functions.https.HttpsError("internal", "send failed.");
    }
  });

//nodemailer onCall
// // 送信に使用するメールサーバーの設定 環境変数 hinokichi
// const mailTransport = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: gmailEmail,
//     pass: gmailPassword
//   }
// });

// // 管理者用のメールテンプレート→uresMail text
// const noticeMail = data => {
//   return `${data.title}締め切り1日前です。

// TODO：
// ${data.title}

// 詳細はこちらから
// todoapp-8da1b.firebaseapp.com
// `;
// };

// exports.sendMail = functions.https.onCall(async (data, context) => {
//   // メール設定userMail
//   let userMail = {
//     from: gmailEmail,//hinokichi
//     to: data.userMail,//userEmail
//     subject: `${data.title}の締切1日前です`,//todoTitle
//     text: noticeMail(data)
//   };
//   try {
//     await mailTransport.sendMail(userMail);
//    } catch (e) {
//     console.error(`send failed. ${e}`);
//     throw new functions.https.HttpsError('internal', 'send failed');
//    }
//   });

// onRequest CORS
// exports.withcors = functions.https.onRequest((request, response) => {
//   // メール設定userMail
//   let userMail = {
//     from: gmailEmail,//hinokichi
//     to: request.userMail,//userEmail
//     subject: `${request.title}の締切1日前です`,//todoTitle
//     text: noticeMail(request)
//   };
//   cors(request, response, () => {
//     response.status(200).send(SendmailTransport, userMail)
//   })
// });
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
