import React from 'react';
import validator from 'email-validator';

class Validator {
    required(value) {
        if (!value)
            return (
            <div className='alert alert-danger' role='alert'>
                This field is required!
            </div>
        );
    };
    
    
    validatePassword(password) {
        if (
            !password.match(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%* #+=\(\)\^?&])[A-Za-z\d$@$!%* #+=\(\)\^?&]{5,}$/
            )
        ) {
            return (
                <div className='alert alert-danger' role='alert'>
                    Your password's length should be at least 5 and should contain at least
                    one letter, one number and one special character.
                </div>
            );
        }
    };
    
    validateEmail(value) {
        if (!validator.validate(value)) {
            return (
                <div className = 'alert alert-danger' role = 'alert'>
                    Enter a valid email!
                </div>
            );
        }
    };
}


export default new Validator();