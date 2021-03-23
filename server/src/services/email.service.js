const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const refreshToken = process.env.REFRESH_TOKEN;
const redirectURI = 'https://developers.google.com/oauthplayground';
const user = process.env.EMAIL;

const sendMail = async (email, subject, message) => {
    
  try {
    // Creating an oAuth2 Client
    const oAuth2Client = new google.auth.OAuth2(clientID, clientSecret, redirectURI);
    oAuth2Client.setCredentials({refresh_token: refreshToken});

    // Gets the access token at that moment
    const accessToken = await oAuth2Client.getAccessToken();

    // Transporter object specifying the type of email used
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth:{
        type: 'OAuth2',
        user: user,
        clientId: clientID,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        accessToken: accessToken
      }
    });
    
    // The Sender and recepient emails
    const options = {
      from: user,
      to: email,
      subject: subject,
      text: message
    };
    
    // Sends the mail
    transporter.sendMail(options, (error, data) => {
      if (error)
        console.log("Unable to send email please check the options provided");
      else
        console.log("Email sent successfully");
    });
  } catch (error) {
      console.log('Unable to send email please check the keys provided');
  }

};
module.exports = sendMail;
