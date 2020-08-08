import * as firebase from 'firebase/app';
import * as functions from 'firebase-functions';
const nodemailer = require("nodemailer");
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
// 送信に使用するメールサーバーの設定
const mailTransport = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  port: 25,
  auth: {
    user: gmailEmail,//環境変数
    pass: gmailPassword//環境変数
  }
});

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


  async function getMailItem() {
    //全ユーザーのデータ取得
    const qSnapshot = await firebase.firestore().collection('users').get();
    const allUsers = qSnapshot.docs;

    const judgeLine = getNextDate();
    //1ユーザーごとにループ
    for await (const user of allUsers) {
      //bdTodosを取得
      const qSnapshot = await user.ref.collection('todolist').where('deadline', '==', judgeLine).get();
      const bdTodos = qSnapshot.docs;
      //MailItemを取得
      MailItem.title = bdTodos.map((bdTodo: any) => bdTodo.data().title);
      MailItem.userMail = user.id;
    }
  }

  //schedulerでメール送信
  exports.sendMail = functions.pubsub.schedule('every 1 minutes')
    .timeZone('Asia/Tokyo')
    .onRun(async (context) => {
      await getMailItem();
      // メール設定userMail
      const userMail = {
        from: gmailEmail,//環境変数
        to: MailItem.userMail,
        subject: `TODO締切1日前のお知らせ`,
        text: `締切1日前のTODOリスト
        title:
        ${MailItem.title}
        詳細はこちらから
        todoapp-8da1b.firebaseapp.com`
      };
      try {
        await mailTransport.sendMail(userMail);
        console.log('send successful')
      } catch (e) {
        console.log('Erroe', e);
      }
    });
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

    // // メール設定userMail
    // const userMail = {
    //   from: gmailEmail,//hinokichi
    //   to: MailItem.userMail,//userEmail
    //   subject: `TODO締切1日前のお知らせ`,//todoTitle
    //   text: `締切1日前のTODOリスト
    //   title:
    //   ${MailItem.title}
    //   詳細はこちらから
    //   todoapp-8da1b.firebaseapp.com`
    // };
    // try {
    //   mailTransport.sendMail(userMail);
    //   } catch (e) {
    //   console.error(`send failed. ${e}`);
    //   // throw new functions.https.HttpsError('internal', 'send failed');
    //   };

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
