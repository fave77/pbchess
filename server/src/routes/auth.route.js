const { Router } = require('express');
const passport = require('passport');
const utils = require('../services/auth.service');
const authRouter = Router();

const clientURL = process.env.CLIENT_URL;

/* LICHESS */
authRouter.get('/lichess', passport.authenticate('lichess'));

authRouter.get(
    '/lichess/callback',
    passport.authenticate('lichess', {
        session: false,
    }),
    (req, res) => {
        let payload = {};
        if (req.user) {
            const user = req.user;
            const tokenObject = utils.issueJWT(user);
            payload = {
                success: true,
                token: tokenObject.token,
                expiresIn: tokenObject.expires,
                username: user.username,
                _id: user._id,
            };
        } else {
            payload = {
                success: false,
                message: "Authentication failed"
            };
        }
        const html = `
            <!DOCTYPE html>
            <html>
                <head>
                <title>Authenticated</title>
                </head>
                <body>
                Authenticated successfully.
                <script type="text/javascript">
                    console.log("Hello Julius");
                    window.opener.postMessage(${JSON.stringify(payload)}, "${clientURL}");
                    window.close();
                </script>
                </body>
            </html>
        `;
        res.set("Content-Security-Policy", "script-src 'self' 'unsafe-inline'");
        return res.send(html)
    }
)

module.exports = authRouter;
