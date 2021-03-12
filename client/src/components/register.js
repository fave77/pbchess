import React, { Component } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';

import AuthService from '../services/auth.service';

import Modal from 'react-bootstrap/Modal';

const required = value => {
  if (!value)
    return (
      <div className='alert alert-danger' role='alert'>
        This field is required!
      </div>
    );
};

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className = 'alert alert-danger' role = 'alert'>
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className = 'alert alert-danger' role = 'alert'>
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: '',
      password: '',
      successful: false,
      message: ''
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: '',
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.username,
        this.state.password
      ).then(
        response => {
          this.setState({
            message: response.msg,
            successful: true
          });


        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  handleClose() {
    this.props.history.push('/live');
    window.location.reload();
  }

  render() {
    return (
      <div className = 'col-md-12'>
        <Modal show = { this.state.successful } onHide = { _ => { this.handleClose() } } s>
          <Modal.Header closeButton>
            <Modal.Title>Welcome!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>...to the world of chess fanatics</p>
          </Modal.Body>
        </Modal>
        <div className = 'card card-container'>
          <img
            src = '//ssl.gstatic.com/accounts/ui/avatar_2x.png'
            alt = 'profile-img'
            className = 'profile-img-card'
          />

          <Form
            name = 'register'
            onSubmit = { this.handleRegister }
            ref = {c => {
              this.form = c;
            }}
          >
            { !this.state.successful && (
              <div>
                <div className = 'form-group'>
                  <label htmlFor = 'username'> Username </label>
                  <Input
                    type = 'text'
                    className = 'form-control'
                    name = 'username'
                    value = { this.state.username }
                    onChange = { this.onChangeUsername }
                    validations = { [required, vusername] }
                  />
                </div>

                <div className = 'form-group'>
                  <label htmlFor = 'password'> Password </label>
                  <Input
                    type = 'password'
                    className = 'form-control'
                    name = 'password'
                    value = { this.state.password }
                    onChange = { this.onChangePassword }
                    validations = { [required, vpassword] }
                  />
                </div>

                <div className = 'form-group'>
                  <button className = 'btn btn-primary btn-block'> Register </button>
                </div>
              </div>
            )}

            { this.state.message && (
              <div className = 'form-group'>
                <div
                  className = {
                    this.state.successful
                      ? 'alert alert-success'
                      : 'alert alert-danger'
                  }
                  role = 'alert'
                >
                  { this.state.message }
                </div>
              </div>
            )}
            <CheckButton
              style = {{ display: 'none' }}
              ref = {c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}

export default Register;
