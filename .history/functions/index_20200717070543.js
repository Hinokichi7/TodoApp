const functions = require('firebase-functions');

const nodemailer = require("nodemailer");

const gmailEmail = functions.config().gmail.email;

const gmailPassword = functions.config().gmail.password;

// const adminEmail = functions.config().admin.email;

// 送信に使用するメールサーバーの設定 環境変数 hinokichi
const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
});

// 管理者用のメールテンプレート→uresMail text
const noticeMail = data => {
  return `${data.title}締め切り1日前です。

TODO：
${data.title}

詳細はこちらから
todoapp-8da1b.firebaseapp.com
`;
};

exports.sendMail = functions.https.onCall(async (data, context) => {
  // メール設定userMail
  let userMail = {
    from: gmailEmail,//hinokichi
    to: data.userMail,//userEmail
    subject: `${data.title}の締切1日前です`,//todoTitle
    text: noticeMail(data)
  };
  try {
    await mailTransport.sendMail(userMail);
   } catch (e) {
    console.error(`send failed. ${e}`);
    throw new functions.https.HttpsError('internal', 'send failed');
   }
  });
// exports.sendMail = functions.https.onCall(async (data, context) => {
//   // メール設定userMail
//   let userMail = {
//     from: gmailEmail,//hinokichi
//     to: data.userMail,//userEmail
//     subject: `${data.title}の締切1日前です`,//todoTitle
//     text: NearDeadlineTodo(data)
//   };
//   try {
//     await mailTransport.sendMail(userMail);
//    } catch (e) {
//     console.error(`send failed. ${e}`);
//     throw new functions.https.HttpsError('internal', 'send failed');
//    }
//   });
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
