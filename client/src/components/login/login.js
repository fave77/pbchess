import React, { Component } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import AuthService from '../../services/auth.service';
import GoogleAuthService from '../../services/auth.google.service';
import GoogleLogin from 'react-google-login';
import './login.css';
import { Link } from 'react-router-dom';
const clientId = process.env.DEV_CLIENT_ID

const required = value => {
  if (!value)
    return (
      <div className = 'alert alert-danger' role = 'alert'>
        This field is required!
      </div>
    );
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSignIn = this.onSignIn.bind(this);

    this.state = {
      username: '',
      password: '',
      loading: false,
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
  
  // Gets called when a user signs in using google
  onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    
    const name = profile.getName();
    const email = profile.getEmail();

    const username = email.substring(0, email.indexOf('@'));
    const password = null;

    this.setState({
      message: '',
      loading: true
    });


    GoogleAuthService.signIn(name, email, username, password, "Google").then(
      () => {
        this.props.history.push('/play');
        window.location.reload();
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
          loading: false,
          message: resMessage
        });
      }
    );
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: '',
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.props.history.push('/play');
          window.location.reload();
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
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }
  
  render() {
    return (
      <div className = 'col-md-12'>
        <meta name="google-signin-client_id" content="1045898621675-4nrfv3qlfcsftgierqbhbhk9h5s0oq81.apps.googleusercontent.com"></meta>

        <div className = 'card card-container login-card'>
          <img
            src = 'https://avataaars.io/?avatarStyle=Circle&topType=Hat&accessoriesType=Round&hairColor=Black&facialHairType=BeardMagestic&facialHairColor=Auburn&clotheType=BlazerSweater&clotheColor=Black&eyeType=Squint&eyebrowType=UnibrowNatural&mouthType=Concerned&skinColor=Tanned'
            alt = 'profile-img'
            className = 'profile-img-card'
          />

          <Form
            name = 'login'
            onSubmit = { this.handleLogin }
            ref = {c => {
              this.form = c;
            }}
          >
            <div className = 'form-group'>
              <label htmlFor = 'username'> Username </label>

              <Input
                type = 'text'
                className = 'form-control'
                name = 'username'
                value = { this.state.username }
                onChange = { this.onChangeUsername }
                validations = { [required] }
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
                validations = { [required] }
              />
            </div> 

            <div className = 'form-group'>
              <button
                className = 'btn btn-block mybtn'
                disabled = { this.state.loading }
              >
                {this.state.loading && (
                  <span className = 'spinner-border spinner-border-sm'></span>
                )}
                <span>Login</span>
              </button>
            </div>
            
            <div className = 'form-group'>
              <GoogleLogin
              clientId = {clientId}
              buttonText = "Sign in with Google"
              onSuccess = {this.onSignIn}
              className = "btn-block"
              />
            </div>

            {this.state.message && (
              <div className = 'form-group'>
                <div className = 'alert alert-danger' role = 'alert'>
                  {this.state.message}
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
          <div style = {{ textAlign: 'center' }}>
              <p style = {{ margin: '0px' }}>
                <strong>Don't have an account?</strong>
              </p>
              <Link 
                style = {{ color: '#647dfc', fontWeight: 'bold' }}
                to = '/register'
              >
                Register here
              </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
