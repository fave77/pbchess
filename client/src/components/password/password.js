import React, { Component, } from "react";
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import AuthService from '../../services/auth.service';
import "./password.css";
import validator from 'email-validator';
import axios from 'axios';
import configAPI from '../../configs/api.config';

const API_URL = configAPI();
const parameters = new URLSearchParams(window.location.search);
const token = parameters.get('token');
const id = parameters.get('id');

const required = value => {
    if (!value)
        return (
        <div className='alert alert-danger' role='alert'>
            This field is required!
        </div>
    );
};


const validatePassword = (password) => {
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

const validateEmail = value => {
    if (!validator.validate(value)) {
        return (
            <div className = 'alert alert-danger' role = 'alert'>
                Enter a valid email!
            </div>
        );
    }
};

class ChangePassword extends Component {
    constructor(props) {
        super(props);

        this.onChangeCurrentPassword = this.onChangeCurrentPassword.bind(this);
        this.onChangeNewPassword = this.onChangeNewPassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
            loading: false,
            message: '',
            success: false,
            props: props
        };

        this.redirectTimeout = null;
    }

    onChangeNewPassword(e) {
        this.setState({
            newPassword: e.target.value,
        });
    }

    onChangeCurrentPassword(e) {
        this.setState({
            currentPassword: e.target.value,
        });
    }

    onChangeConfirmPassword(e) {
        this.setState({
            confirmPassword: e.target.value,
        });
    }

    handleSubmit(e){
        e.preventDefault();

        this.setState({
            loading: true,
            message: '',
            success: false
        })
    
        this.form.validateAll();

        if(this.state.confirmPassword != this.state.newPassword){
            this.setState({
                loading: false,
                message: 'The passwords you entered do not match!',
                success: false
            })
            return;
        }

        if(this.state.confirmPassword == this.state.currentPassword){
            this.setState({
                loading: false,
                message: 'Your current password is same as the old one!',
                success: false
            })
            return;
        }

        const user = AuthService.getCurrentUser();
        
        AuthService.changePassword(this.state.currentPassword, this.state.confirmPassword, user._id).then(
            response => {
                const success = response.success;
                const message = response.msg;
                console.log(success, message);
                this.setState({
                    loading: false,
                    success: success,
                    message: message
                })

                if(success){
                    setTimeout(() => {
                        AuthService.logout();
                        window.location.reload();
                    }, 5000);
                }
            }
        )

    }

    render() {
        return (
            <div className = "col-md-12">
                <div className = "card card-container password-card">
                    <h2 class = "pswd-title">Change Password</h2>
                    <Form
                        name="changePassword"
                        onSubmit={this.handleSubmit}
                        ref={(c) => {
                            this.form = c;
                        }}
                    >
                        <div className="form-group">
                            <label htmlFor="currentPassword"> Current Password </label>
                            <Input
                                type="password"
                                className="form-control"
                                name="currentPassword"
                                value={this.state.currentPassword}
                                onChange={this.onChangeCurrentPassword}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="newPassword"> New Password </label>
                            <Input
                                type="password"
                                className="form-control"
                                name="newPassword"
                                value={this.state.newPassword}
                                onChange={this.onChangeNewPassword}
                                validations={[required, validatePassword]}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword"> Confirm Password </label>
                            <Input
                                type="password"
                                className="form-control"
                                name="confirmPassword"
                                value={this.state.confirmPassword}
                                onChange={this.onChangeConfirmPassword}
                                validations={[required, validatePassword]}
                            />
                        </div>

                        <div className="form-group">
                            <button
                                className="btn btn-block mybtn"
                                disabled={this.state.loading}
                            >
                                {this.state.loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Submit</span>
                            </button>
                        </div>

                        {this.state.message && (
                            <div className="form-group">
                                <div className={this.state.success? "alert alert-success" : "alert alert-danger"} role="alert">
                                    {this.state.message}
                                </div>
                            </div>
                        )}
                    </Form>
                </div>
            </div>
        );
    }
}


class ResetPassword extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.handleSubmitPassword = this.handleSubmitPassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.handleSubmitEmail = this.handleSubmitEmail.bind(this);

        this.state = {
            password: '',
            email: '',
            submitted: false,
            messagePassword: 'Please wait while we verify you.',
            messageEmail: 'Please wait while we send you an email.',
            token: token
        };
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    handleSubmit(e){
        e.preventDefault();
        if(!this.state.token){
            this.handleSubmitEmail();
        }else{
            this.handleSubmitPassword();
        }
    }

    handleSubmitEmail() {

        this.setState({
            submitted: true
        });

        axios.post(API_URL + 'password/email', {
            email: this.state.email
        }).then(res => {
            this.setState({
                messageEmail: res.data.msg
            })
        })
    }

    handleSubmitPassword(){
        this.setState({
            submitted: true
        });

        this.setState({
            token: 'Bearer ' + this.state.token
        }, () => {
            axios.put(API_URL + 'password/reset', {
                password: this.state.password,
                id: id
            },{
                headers: { Authorization: this.state.token }
            }).then(res => {
                this.setState({
                    messagePassword: res.data.msg
                })
            })
        })
    }

    render() {
        return (
            this.state.token? (!this.state.submitted? (<div className = "col-md-12">
                <div className = "card card-container password-card">
                    <h2 class = "pswd-title">Enter your new password</h2>
                    <Form
                        name="Reset Password"
                        onSubmit={this.handleSubmit}
                        ref={(c) => {
                            this.form = c;
                        }}
                    >
                        <div className="form-group">
                            <label htmlFor="password"> Password :  </label>
                            <Input
                                type="password"
                                className="form-control"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                validations={[required, validatePassword]}
                            />
                        </div>

                        <div className="form-group">
                            <button className="btn btn-block mybtn">
                                <span>Submit</span>
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        ): <h1> {this.state.messagePassword} </h1>):  
        !this.state.submitted? (<div className = "col-md-12">
                <div className = "card card-container password-card">
                    <h2 class = "pswd-title">Reset password</h2>
                    <Form
                        name="Reset Password"
                        onSubmit={this.handleSubmit}
                        ref={(c) => {
                            this.form = c;
                        }}
                    >
                        <div className="form-group">
                            <label htmlFor="email"> Provide the email associated with your account: </label>
                            <Input
                                type="email"
                                className="form-control"
                                name="email"
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                                validations={[required, validateEmail]}
                            />
                        </div>

                        <div className="form-group">
                            <button className="btn btn-block mybtn">
                                <span>Submit</span>
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        ): <h1> {this.state.messageEmail} </h1>
        )}
}

export {
    ChangePassword,
    ResetPassword
};
