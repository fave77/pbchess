import React, { Component, } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import AuthService from '../../services/auth.service';
import Validator from '../../services/validation.service';
// import './password.css';

class UpdatePassword extends Component {
    constructor(props) {
        super(props);

        this.onChangeCurrentPassword = this.onChangeCurrentPassword.bind(this);
        this.onChangeNewPassword = this.onChangeNewPassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
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
            <div className = 'col-md-12'>
                <div className = 'card card-container password-card'>
                    <h2 class = 'pswd-title'>Change Password</h2>
                    <Form
                        name='changePassword'
                        onSubmit={this.handleSubmit}
                        ref={(c) => {
                            this.form = c;
                        }}
                    >
                        <div className='form-group'>
                            <label htmlFor='currentPassword'> Current Password </label>
                            <Input
                                type='password'
                                className='form-control'
                                name='currentPassword'
                                value={this.state.currentPassword}
                                onChange={this.onChangeCurrentPassword}
                                validations={[Validator.required]}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='newPassword'> New Password </label>
                            <Input
                                type='password'
                                className='form-control'
                                name='newPassword'
                                value={this.state.newPassword}
                                onChange={this.onChangeNewPassword}
                                validations={[Validator.required, Validator.validatePassword]}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='confirmPassword'> Confirm Password </label>
                            <Input
                                type='password'
                                className='form-control'
                                name='confirmPassword'
                                value={this.state.confirmPassword}
                                onChange={this.onChangeConfirmPassword}
                                validations={[Validator.required, Validator.validatePassword]}
                            />
                        </div>

                        <div className='form-group'>
                            <button
                                className='btn btn-block mybtn'
                                disabled={this.state.loading}
                            >
                                {this.state.loading && (
                                    <span className='spinner-border spinner-border-sm'></span>
                                )}
                                <span>Submit</span>
                            </button>
                        </div>

                        {this.state.message && (
                            <div className='form-group'>
                                <div className={this.state.success? 'alert alert-success' : 'alert alert-danger'} role='alert'>
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

export default UpdatePassword;