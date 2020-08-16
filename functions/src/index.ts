const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// const nodemailer = require("nodemailer");
// const gmailEmail = functions.config().gmail.email;
// const gmailPassword = functions.config().gmail.password;
// // 送信に使用するメールサーバーの設定
// const mailTransport = nodemailer.createTransport({
//   service: "gmail",
//   secure: false,
//   port: 25,
//   auth: {
//     user: gmailEmail,//環境変数
//     pass: gmailPassword//環境変数
//   }
// });

// let allUsers: any[] = []

exports.helloOnCall = functions.https.onRequest(async (req: any, res: any) => {
  //read
  const judgeline = getNextDate();
  const qSnapshot = await admin.firestore().collection('users').get();
  const allUsers = qSnapshot.docs;
  // res.send(judgeline);
  for await (const user of allUsers) {// eslint-disable-line
    const qSnapshot2 = await user.ref.collection('todolist').where('deadline', '==', judgeline).get();
    const bdTodos = qSnapshot2.docs;
    const mailItem = {
      title: [],
      userMail: user.id,
    };
    mailItem.title = bdTodos.map((bdTodo: any) => bdTodo.data().title);
    res.send(mailItem.userMail);
  }
});

function getNextDate() {// eslint-disable-line
  const dt = new Date();
  const y = dt.getFullYear();
  const m = `00${dt.getMonth() + 1}`.slice(-2);
  const d = `00${dt.getDate() + 2}`.slice(-2);
  const result = `${y}-${m}-${d}`;
  return result;
}

// async function getAllUsers() {// eslint-disable-line
//   const qSnapshot = await firebase.firestore().collection('users').get();
//   allUsers = qSnapshot.docs;
// }



  // //schedulerでメール送信
  // exports.sendMail = functions.pubsub.schedule('every 1 minutes')
  //   .timeZone('Asia/Tokyo')
  //   .onRun(async (context) => {
  //     const judgeline = getNextDate();
  //     await getAllUsers();

  //     for await (const user of allUsers) {// eslint-disable-line
  //       const qSnapshot = await user.ref.collection('todolist').where('deadline', '==', judgeline).get();
  //       const bdTodos = qSnapshot.docs;
  //       // todosループ
  //       // 1todoのタイトルを抽出して、配列に入れる
  //       const mailItem = {
  //         title: [],
  //         userMail: user.id,
  //       };
  //       mailItem.title = bdTodos.map((bdTodo: any) => bdTodo.data().title);

  //       if (mailItem.title !== []) {
  //               // メール設定userMail
  //         const userMail = {
  //           from: gmailEmail,//hinokichi
  //           to:  mailItem.userMail,//userEmail
  //           subject: `TODO締切1日前のお知らせ`,//todoTitle
  //           text: `締切1日前のTODOリスト
  //           title:
  //           ${mailItem.title}
  //           詳細はこちらから
  //           todoapp-8da1b.firebaseapp.com`
  //         };
  //         try {
  //           await mailTransport.sendMail(userMail);
  //           console.log('send successful')
  //         } catch (e) {
  //           console.log('Erroe', e);
  //         }
  //       }
  //     }
  //   });

  // //schedulerでメール送信
  // exports.sendMail = functions.pubsub.schedule('every 1 minutes')
  //   .timeZone('Asia/Tokyo')
  //   .onRun(async (context) => {
  //     const judgeline = getNextDate();
  //     await getAllUsers();
  //     // メール設定userMail
  //     const userMail = {
  //       from: gmailEmail,//環境変数
  //       to: 'faeriepunks7610@gmail.com',
  //       subject: `TODO締切1日前のお知らせ`,
  //       text: `締切1日前のTODOリスト
  //       title:
  //       詳細はこちらから
  //       todoapp-8da1b.firebaseapp.com`
  //     };
  //     try {
  //       await mailTransport.sendMail(userMail);
  //       console.log('send successful')
  //     } catch (e) {
  //       console.log('Erroe', e);
  //     }
  //   });

  // //onCall test
  // exports.sendMail = functions.https.onCall(async (data: any, context: any) => {
  //   // メール設定userMail
  //   let userMail = {
  //     from: gmailEmail,//hinokichi
  //     to:  data.userMail,//userEmail
  //     subject: `TODO締切1日前のお知らせ`,//todoTitle
  //     text: `締切1日前のTODOリスト
  //     title:
  //     ${data.title}
  //     詳細はこちらから
  //     todoapp-8da1b.firebaseapp.com`
  //   };
  //   try {
  //     await mailTransport.sendMail(userMail);
  //    } catch (e) {
  //     console.error(`send failed. ${e}`);
  //     throw new functions.https.HttpsError('internal', 'send failed');
  //    }
  //   });

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
