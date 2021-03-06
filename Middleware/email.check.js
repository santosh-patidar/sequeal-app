var nodemailer = require('nodemailer');
const connect = require('../config/db.connect');
const { sequelize } = require('sequelize');

const mailerFun = function (body) {
  return new Promise(async (resolve, reject) => {
    try {

      var transporter = nodemailer.createTransport(({
        service: 'gmail',
        auth: {
          user: 'santoshpatidar.idealittechno@gmail.com',
          pass: 'santoshideal'
        }
      }));
      var mailOptions = {
        from: 'santoshpatidar.idealittechno@gmail.com',
        to: body.email,
        subject: 'Sending Email Registration..',
        html: "<h2>  Hello, " + body.name + " Your Email is , " + body.email + "</h2><p>Register succesfully....</p>",
        text: " Email Register succesfully....,"
      };

      await transporter.sendMail(mailOptions, function (err, info) {
        if (err) {

          console.log(err);
          resolve({
            status: false,
            statuscode: 400,
            msg: "Email not send plz enter valide Email"
          })
        } else {
          console.log('Email sent: ' + info.response + " " + body.email);
          resolve({
            status: true,
            statuscode: 200,
            msg: "Email send " + body.email
          })
        }
      });

    }
    catch (err) {
      console.log(err);
    }
  });
}
module.exports = {
  mailerFun
}
