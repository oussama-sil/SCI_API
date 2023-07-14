var nodemailer = require("nodemailer");

const mail_format = {
  box_full: {
    subject: "Box opened",
    text: "Box is full",
  },
  box_empty: {
    subject: "Box opened",
    text: "Box is empty",
  },
};

function sendEmail(from, to, mail) {
  return new Promise(async (resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "oussama4123silem11@gmail.com",
        pass: "yourpassword",
      },
    });

    var mailOptions = {
      from: "youremail@gmail.com",
      to: "myfriend@yahoo.com",
      subject: "Sending Email using Node.js",
      text: "That was easy!",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    var mailOptions = mail_format[mail];
    //   console.log(mailOptions);
    resolve(mailOptions);
  });
}

module.exports = { sendEmail };
