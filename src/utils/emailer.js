const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const dotenv = require("dotenv");

dotenv.config();

const { EMAIL, PASSWORD, MAIN_URL } = process.env;

let transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
//  TODO: change the Email , password , url as per the need in the config.
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
});

let MailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Nodemailer",
    link: MAIN_URL,
  },
});

const sendSignUpMail = async (req, res) => {
  const { userEmail, name } = req.body;

  // sign up the user .....

  // then send the email
  let response = {
    body: {
      name,
      intro: "Welcome to GIRARD TRAINING STABLES!",
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: EMAIL,
    to: userEmail,
    //TODO:Change the subject dynamically
    subject: "GIRARD TRAINING STABLES - SIGNUP sucessful",
    html: mail,
  };

  await transporter
    .sendMail(message)
    .then(() => {
      return res
      .json({ msg: "Email sent Sucessfully" });
    })
    .catch((error) => console.error(error));
};

const sendLessonMail = async (emailBody) => {
  const { name, userEmail } = emailBody;

  let response = {
    body: {
      name,
      intro: "Welcome to the Girard Training Stables ",
      table: {
        data: [
          {
          //TODO:add misc details
           lesson:"LESSON_NAME"
          },
        ],
      },
      outro: "We booked a lesson.",
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: EMAIL,
    to: userEmail,
    subject: "Signup mail",
    html: mail,
  };

  try {
    const resp = await transporter.sendMail(message)
    return { msg: "you should receive an email from us" };
    
  } catch (error) {
    console.error(error)
  }
};

module.exports = {
  sendSignUpMail,
  sendLessonMail,
};