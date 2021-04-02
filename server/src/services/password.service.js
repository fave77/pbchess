const User = require('../models/user.model');
const utils = require('./auth.service');

const savePassword = async (password, id) => {
    try {
        const { salt, hash } = utils.createPassword(password);
        const user = await User.findOneAndUpdate({ _id: id }, {
            salt: salt,
            hash: hash
        });
        return user;
    } catch(error){
        console.log(error);
    }

};

module.exports = savePassword;
