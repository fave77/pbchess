import React, { Component } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import validator from 'email-validator';
import AuthService from '../../services/auth.service';

import Modal from 'react-bootstrap/Modal';

import './register.css';

const required = value => {
  if (!value)
    return (
      <div className='alert alert-danger' role='alert'>
        This field is required!
      </div>
    );
};

const vemail = value => {
  if (!validator.validate(value)) {
    return (
      <div className = 'alert alert-danger' role = 'alert'>
        The email must be valid!
      </div>
    );
  }
};

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className = 'alert alert-danger' role = 'alert'>
        The username must be between 3 and 20 characters!
      </div>
    );
  }
};

const vpassword = (password) => {
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

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeFullname = this.onChangeFullname.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      fullname: '',
      email: '',
      username: '',
      password: '',
      successful: false,
      message: ''
    };
  }

  onChangeFullname(e) {
    this.setState({
      fullname: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
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
        this.state.fullname,
        this.state.email,
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
            ( error.response &&
              error.response.data &&
              error.response.data.msg
            ) 
            || error.message 
            || error.toString();
            
          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  handleClose() {
    this.props.history.push('/play');
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
        <div className = 'card card-container register-card'>
          <img
            src = 'https://avataaars.io/?avatarStyle=Circle&topType=Hat&accessoriesType=Round&hairColor=Black&facialHairType=BeardMagestic&facialHairColor=Auburn&clotheType=BlazerSweater&clotheColor=Black&eyeType=Squint&eyebrowType=UnibrowNatural&mouthType=Concerned&skinColor=Tanned'
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
                  <label htmlFor = 'fullname'> Fullname </label>
                  <Input
                    type = 'text'
                    className = 'form-control'
                    name = 'fullname'
                    placeholder = "John Doe"
                    value = { this.state.fullname }
                    onChange = { this.onChangeFullname }
                    validations = { [required] }
                  />
                </div>

                <div className = 'form-group'>
                  <label htmlFor = 'email'> Email </label>
                  <Input
                    type = 'email'
                    className = 'form-control'
                    name = 'email'
                    placeholder = "johndoe@xyz.com"
                    value = { this.state.email }
                    onChange = { this.onChangeEmail }
                    validations = { [required, vemail] }
                  />
                </div>

                <div className = 'form-group'>
                  <label htmlFor = 'username'> Username </label>
                  <Input
                    type = 'text'
                    className = 'form-control'
                    name = 'username'
                    placeholder = "johndoe"
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
                    placeholder = "Abcd1#@*"
                    value = { this.state.password }
                    onChange = { this.onChangePassword }
                    validations = { [required, vpassword] }
                  />
                </div>

                <div className = 'form-group'>
                  <button className = 'btn btn-block mybtn'> Register </button>
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
