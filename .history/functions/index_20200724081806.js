// const firebase = require("firebase");
const functions = require('firebase-functions');
const admin = require('firebase-admin')
const cors = require('cors')({origin: true});
const nodemailer = require("nodemailer");
const { use } = require("vue/types/umd");
const SendmailTransport = require("nodemailer/lib/sendmail-transport");
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
admin.initializeApp();

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

// exports.sendEmail = functions.https.onRequest((req, res) => {
//   const email = req.query.email
//   cors(req, res, () => {
//     const mailOptions = {
//       from: gmailEmail,//hinokichi
//       to: email,//userEmail
//       subject: `${data.title}の締切1日前です`,//todoTitle
//       text: text(data)
//     }
//     return mailTransport.sendMail(mailOptions, (err, info) => {
//       if(err) {
//         return res.send(err.toString())
//       }
//       return res.status(200).send('Sended!')
//     })
//   })
// });
exports.sendMail = functions.https.onCall(async (data, context) => {
  // メール設定userMail
  let userMail = {
    from: gmailEmail,//hinokichi
    to: data.userMail,//userEmail
    subject: `${data.title}の締切1日前です`,//todoTitle
    text: NearDeadlineTodo(data)
  };
  try {
    await mailTransport.sendMail(userMail);
   } catch (e) {
    console.error(`send failed. ${e}`);
    throw new functions.https.HttpsError('internal', 'send failed');
   }
  });
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
