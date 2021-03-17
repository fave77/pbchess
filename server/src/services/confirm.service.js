const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const refreshToken = process.env.REFRESH_TOKEN;
const redirectURI = 'https://developers.google.com/oauthplayground';
const user = process.env.EMAIL;


const oAuth2Client = new google.auth.OAuth2(clientID, clientSecret, redirectURI);
oAuth2Client.setCredentials({refresh_token: refreshToken});

const confirmMail = async (dbUser, email) => {

    console.log(dbUser);
    const accessToken = await oAuth2Client.getAccessToken();
    try{
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
        
        const url = process.env.NODE_ENV == "development" ? DEV_URI : PROD_URI;
        
        const message = `Thank you for registering at Pbchess. Your username is ${dbUser.username}. 
        Please confirm your email using the given link to continue to the site. ${url}?userId=${dbUser._id}`;

        const options = {
            from: user,
            to: email,
            subject: "Email Confirmation",
            text: message
        };
        
        transporter.sendMail(options, (error, data) => {
            if(error){
                console.log(error);
                console.log("Unable to send email please check the options provided");
            }else{
                console.log("Email sent successfully");
            }
        });
    }catch(error){
        console.log('Unable to send email please check the keys provided');
    }
};
module.exports = confirmMail;
