import React, { Component, } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import axios from 'axios';
import configAPI from '../../configs/api.config';
import Validator from '../../services/validation.service';

const API_URL = configAPI();
const parameters = new URLSearchParams(window.location.search);
const token = parameters.get('token');
const id = parameters.get('id');

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
            this.state.token? (!this.state.submitted? (<div className = 'col-md-12'>
                <div className = 'card card-container password-card'>
                    <h2 class = 'pswd-title'>Enter your new password</h2>
                    <Form
                        name='Reset Password'
                        onSubmit={this.handleSubmit}
                        ref={(c) => {
                            this.form = c;
                        }}
                    >
                        <div className='form-group'>
                            <label htmlFor='password'> Password :  </label>
                            <Input
                                type='password'
                                className='form-control'
                                name='password'
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                validations={[Validator.required, Validator.validatePassword]}
                            />
                        </div>

                        <div className='form-group'>
                            <button className='btn btn-block mybtn'>
                                <span>Submit</span>
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        ): <h1> {this.state.messagePassword} </h1>):  
        !this.state.submitted? (<div className = 'col-md-12'>
                <div className = 'card card-container password-card'>
                    <h2 class = 'pswd-title'>Reset password</h2>
                    <Form
                        name='Reset Password'
                        onSubmit={this.handleSubmit}
                        ref={(c) => {
                            this.form = c;
                        }}
                    >
                        <div className='form-group'>
                            <label htmlFor='email'> Provide the email associated with your account: </label>
                            <Input
                                type='email'
                                className='form-control'
                                name='email'
                                required
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                                validations={[Validator.required, Validator.validateEmail]}
                            />
                        </div>
                        <div className='form-group'>
                            <button className='btn btn-block mybtn'>
                                <span>Submit</span>
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        ): <h1> {this.state.messageEmail} </h1>
        )}
}

export default ResetPassword;