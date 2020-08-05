import * as firebase from 'firebase';
import * as functions from 'firebase-functions';
const nodemailer = require("nodemailer");
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
// const currentUser = firebase.auth().currentUser!;
let allUsers: any[] = []
let bdTodos: any[] = []
const MailItem: any = {
  title: [],
  userMail: '',
}

//次の日をstringで取得
  function getNextDate() {// eslint-disable-line
    const dt = new Date();
    const y = dt.getFullYear();
    const m = `00${dt.getMonth() + 1}`.slice(-2);
    const d = `00${dt.getDate() + 1}`.slice(-2);
    const result = `${y}-${m}-${d}`;
    return result;
  }

  async function getUsers() {
    const qSnapshot = await firebase.firestore().collection('users').get();
    allUsers = qSnapshot.docs;
  }

  function getBeforeDeadlineTodos() {
    const judgeLine = getNextDate();
    const users = allUsers.map((user) => user.data());
    const usersBdTodos = users.map(async (user) => user.collections('todolist').where('deadline', '==', judgeLine).get());
    usersBdTodos.map((bdTodo) => bdTodo.docs)
  }
// //締切1日前のTODOを取得
//   async function getBeforeDeadlineTodos() {
//     const judgeLine = getNextDate();
//     console.log(judgeLine);
//     const qSnapshot = await db.where('deadline', '==', judgeLine).get();
//     bdTodos = qSnapshot.docs;
//     getMailItem();
//     console.log(MailItem);
//   }
  function getMailItem() {
    getBeforeDeadlineTodos();
    MailItem.title = bdTodos.map((bdTodo) => bdTodo.data().title);
    MailItem.userMail = currentUser.email!;
  }

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
  // メール設定userMail
  const userMail = {
    from: gmailEmail,//hinokichi
    to: MailItem.userMail,//userEmail
    subject: `TODO締切1日前のお知らせ`,//todoTitle
    text: `締切1日前のTODOリスト
    title:
    ${MailItem.title}
    詳細はこちらから
    todoapp-8da1b.firebaseapp.com`
  };
  try {
    mailTransport.sendMail(userMail);
    } catch (e) {
    console.error(`send failed. ${e}`);
    // throw new functions.https.HttpsError('internal', 'send failed');
    };
  // exports.sendMail = functions.https.onCall(async (data: any, context: any) => {
  //   // メール設定userMail
  //   let userMail = {
  //     from: gmailEmail,//hinokichi
  //     to: data.userMail,//userEmail
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
