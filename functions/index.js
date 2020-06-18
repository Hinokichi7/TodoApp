const functions = require('firebase-functions');

const admin = require('firebase-admin');

const nodemailer = require('nodemailer');// eslint-disable-line import/no-extraneous-dependencies

const cors = require('cors')({origin: true});// eslint-disable-line import/no-extraneous-dependencies

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

admin.initializeApp();

// Using Gmail
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword
    }
});

// Sending the request
exports.sendMail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {

        // Getting query parameter from http request
        const to = req.query.to;
        const msg = req.query.msg;

        const mailOptions = {
            from: gmailEmail,
            to: to,
            subject: 'This is a sample of email function',
            html: `${msg}`
        };

        // Getting results
        return transporter.sendMail(mailOptions, (erro, info) => {
            if(erro){
                return res.send(erro.toString());
            }
            return res.send('Sended');
        });
    });
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
