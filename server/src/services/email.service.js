const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const googleClientID = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const googleRefreshToken = process.env.GOOGLE_REFRESH_TOKEN;
const redirectURL = 'https://developers.google.com/oauthplayground';
const user = process.env.EMAIL;

const sendMail = async (email, subject, message) => {
    
  try {
    // Creating an oAuth2 Client
    const oAuth2Client = new google.auth.OAuth2(googleClientID, googleClientSecret, redirectURL);
    oAuth2Client.setCredentials({refresh_token: googleRefreshToken});

    // Gets the access token at that moment
    const accessToken = await oAuth2Client.getAccessToken();

    // Transporter object specifying the type of email used
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth:{
        type: 'OAuth2',
        user: user,
        clientId: googleClientID,
        clientSecret: googleClientSecret,
        refreshToken: googleRefreshToken,
        accessToken: accessToken
      }
    });
    
    // The Sender and recepient emails
    const options = {
      from: user,
      to: email,
      subject: subject,
      html: message
    };
    
    // Sends the mail
    transporter.sendMail(options, (error, data) => {
      if (error) {
        console.log("Unable to send email please check the options provided");
      } else
        console.log("Email sent successfully");
    });
  } catch (error) {
      console.log('Unable to send email please check the keys provided');
  }

};
module.exports = sendMail;
