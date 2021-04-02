const User = require('../models/user.model');
const utils = require('../services/auth.service');

const changePassword = async (password, id) => {
    try{
        const { salt, hash } = utils.createPassword(password);
        const user = await User.findOneAndUpdate({ _id: id }, {
            salt: salt,
            hash: hash
        });
        return user;
    }catch(error){
        console.log(error);
    }

}

module.exports = changePassword