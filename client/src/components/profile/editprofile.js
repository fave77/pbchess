import React, { Component } from 'react';
import configAPI from '../../configs/api.config';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import validator from 'validator';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Select from 'react-validation/build/select';
import Button from 'react-validation/build/button';
import authHeader from '../../services/auth.header';
import Alert from 'react-bootstrap/Alert';
import Avatar from 'avataaars';
import './editprofile.css';


const countryList = require('./countrylist');
const API_URL = configAPI();

//form validation logic
const required = value => {
  if(!value.toString().trim().length) {
    return <span className='text-danger'>This field cannot be empty. A value is required.</span>
  }
};
const email = value => {
  if(!validator.isEmail(value)) {
    return <span className='text-danger'><b>{value}</b> is not a valid email.</span>;
  }
};

class EditProfilePopup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditedProfileSaving: false,
      fullname: '',
      email: '',
      gender: 'NA',
      country: 'NA',
      alertSuccess: {
        isActive: false,
        msg: ''
      },
      alertFailure: {
        isActive: false,
        msg: ''
      }
    };
  }

  onChangeFullname = (e) => {
    this.setState({
      fullname: e.target.value
    });
  }
  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value
    });
  }
  onChangeGender = (e) => {
    this.setState({
      gender: e.target.value
    })
  }
  onChangeCountry = (e) => {
    this.setState({
      country: e.target.value
    })
  }
  onCloseAlertSuccess = (e) => {
    this.setState({
      alertSuccess: {
        isActive: false
      }
    });
  }
  onCloseAlertFailure = (e) => {
    this.setState({
      alertFailure: {
        isActive: false
      }
    });
  }
  
  

  updateProfile = (e) => {

    const { fullname, email, gender, country} = this.state;
    const {avatar} = this.props;
    return axios.put(`${API_URL}update-profile`, {
      username: this.props.currentUser.username,
      avatar,
      fullname,
      email,
      gender,
      country
    }, {
      headers: authHeader()
    });
  }

  async handleProfileEdit(e) {
    e.preventDefault();
    this.form.validateAll();

    //loading starts
    this.setState({
      isEditedProfileSaving: true
    })
  
    try {
      const updateProfileResponse =  await this.updateProfile();
      const {success, msg, ...updatedProfileData} = updateProfileResponse.data; 
      if (success) {
        this.setState({
          alertSuccess: {
            isActive: true,
            msg
          },
          alertFailure: {
            isActive: false
          }
        });
        this.props.rerenderProfileWithUpdatedData(updatedProfileData);
      } else {
        this.setState({
          alertSuccess: {
            isActive: false
          },
          alertFailure: {
            isActive: true, 
            msg
          }
        });
      }
    }
    catch (err) {
      console.error(err);
    }
    this.setState({
      isEditedProfileSaving: false
    })
  }

  componentDidMount() {
    const {fullname, email, gender, country } = this.props;
    this.setState({
      fullname,
      email,
      gender: gender === 'NA' ? '' : gender,
      country: country === 'NA' ? '' : country
    });
  }

  render() {

    const {alertSuccess, alertFailure} = this.state;
    const {avatar} = this.props;

    return (
      <div className='edit-profile-popup'>

          <h3 className='edit-profile-popup__title'>Edit your Details</h3>
          <Avatar
            style={{ 
                display: 'inline-block',
                width: '160px',
                height: '160px',
                boxShadow: '0 2 4 0 #16191f',
                borderRadius: '50%',
                marginTop: '8px'
            }}
            avatarStyle="Circle"
            topType={avatar.top}
            accessoriesType={avatar.accessories}
            hairColor={avatar.hairColor}
            facialHairType={avatar.facialHair}
            clotheType={avatar.clothes}
            eyeType={avatar.eyes}
            eyebrowType={avatar.eyebrow}
            mouthType={avatar.mouth}
            skinColor={avatar.skin}
            clotheColor={avatar.clothColor}
            />
          <Form 
          className='edit-profile-popup__form'
          name = 'edit_profile'
          onSubmit = { this.handleProfileEdit.bind(this) }
          ref = {c => {
            this.form = c;
          }}
        >
          {
            <Alert 
              variant='success' 
              show={alertSuccess.isActive} 
              dismissible 
              onClose={this.onCloseAlertSuccess}
            >
              {alertSuccess.msg}
            </Alert>
          }
          {
            <Alert 
              variant='danger'
              show={alertFailure.isActive} 
              dismissible 
              onClose={this.onCloseAlertFailure}
            >
              {alertFailure.msg}
            </Alert>
          }
          
          <label className='edit-profile-popup__input-label' htmlFor="edit_fullname">Fullname</label>
          <Input 
            className='edit-profile-popup__input form-control'
            id='edit_fullname'
            name='edit_fullname'
            type="text"
            placeholder='Enter Fullname'
            value={this.state.fullname}
            onChange={this.onChangeFullname}
            disabled={this.state.isEditedProfileSaving} 
            validations={[required]}
          />
          <label className='edit-profile-popup__input-label' htmlFor="edit_email">Email</label>
          <Input 
            className='edit-profile-popup__input form-control'
            id='edit_email'
            name='edit_email'
            type="email"
            placeholder='Enter Email' 
            value={this.state.email} 
            onChange={this.onChangeEmail} 
            disabled={this.state.isEditedProfileSaving} 
            validations={[required, email]}
          />
          <label className='edit-profile-popup__input-label' htmlFor="edit_gender">Gender</label>
          <Select
            className='edit-profile-popup__input form-control' 
            id='edit_gender' value={this.state.gender}
            name='edit_gender'
            onChange={this.onChangeGender} 
            disabled={this.state.isEditedProfileSaving}
            validations={[required]}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non Binary">Non Binary</option>
          </Select>
          <label className='edit-profile-popup__input-label' htmlFor="edit_country">Country</label>
          <Select 
            className='edit-profile-popup__input form-control' 
            id="edit_country" 
            name='edit_country'
            value={this.state.country} 
            onChange={this.onChangeCountry} 
            disabled={this.state.isEditedProfileSaving}
            validations={[required]}
          >
            <option value="">Select Country</option>
            {
              countryList.map(countryName => <option value={countryName}>{countryName}</option>)
            }
          </Select>
          <div className="edit-profile-popup__btn-group">
            { 
              this.state.isEditedProfileSaving ? (
                <button className="edit-profile-popup__save-btn" disabled>
                  Saving{" "}<Spinner animation='border' size='sm' as='span' variant='dark' role='status' />
                </button>
              ) : (
                  <Button className="edit-profile-popup__save-btn">
                    Save
                  </Button>
                )
            }
            <button 
              className="edit-profile-popup__discard-btn" 
              onClick={this.props.onClickDiscard} 
              disabled={this.state.isEditedProfileSaving}
            >
              Discard
            </button>
          </div>
        </Form>
      </div>
    );
  }
}

export default EditProfilePopup;
