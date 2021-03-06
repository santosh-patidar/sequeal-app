var nodemailer = require('nodemailer');
const connect = require('../config/db.connect');
const { sequelize } = require('sequelize');


///////////////otp////////////
const mailerFunotp = function (data) {
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
                to: data.email,
                subject: 'Sending Email Registration..',
                html: "<h2> Your Email is , " + data.email + " \n and Your Otp Is " + data.otp + "</h2><p>Otp Expire after 1 Minute Do harryUp.....</p>",
                text: " Email Register succesfully....,"
            };

            await transporter.sendMail(mailOptions, function (err, info) {
                if (err) {

                    console.log(err);

                } else {
                    console.log('OTP sent: ' + info.response + " " + data.otp);
                    resolve({
                        status: true,
                        statuscode: 200,
                        msg: "Email send " + data.email
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
    mailerFunotp
}

