import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import { CSSTransition } from 'react-transition-group';
import Spinner from 'react-bootstrap/Spinner';
import AuthService from '../../services/auth.service';
import configAPI from '../../configs/api.config';
import EditProfilePopup from './editprofile'
import EditAvatarPopup from './editavatar';
import './profile.css';
import Avatar from 'avataaars';
import EditIcon from '@material-ui/icons/Edit';


const API_URL = configAPI();


class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      isProfileLoading: true,
      profileNotFound: false,
      isEditProfilePopupActive: false,
      isEditAvatarPopupActive: false,
      profileData: {},
    };
  }
  onClickEditProfile = (e) => {
    this.setState({
      isEditProfilePopupActive: true,
    });
    //this scrolls up page to bring complete edit profile popup in view.
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  onClickEditAvatar = (e) => {
    this.setState({
      isEditAvatarPopupActive: true,
    });
   

  }

  onClickDiscard = (e) => {
    e.preventDefault();
    this.setState({
      isEditProfilePopupActive: false,
      isEditAvatarPopupActive: false,
    });
  };

  //rerenders profile with updated data after a successful put request in editprofile.js
  rerenderProfileWithUpdatedData = (updatedProfileData) => {
    const { fullname, avatar, email, gender, country } = updatedProfileData;
    this.setState({
      profileData: {
        ...this.state.profileData,
        avatar, 
        fullname,
        email,
        gender,
        country,
      },
    });
  };

  fetchProfile(username) {
    return axios.post(`${API_URL}fetch-profile`, { username });
  }

  async componentDidMount() {
    const username = this.props.match.params.profileId;
    try {
      const { data } = await this.fetchProfile(username);
      const { avatar, country, email, fullname, gender, joined } = data;
     
      this.setState({
        profileData: {
          username,
          fullname,
          avatar,
          email,
          gender,
          country,
          joined,
        },
      });
    } catch (err) {
      this.setState({
        profileNotFound: true,
      });
      console.error(err);
    } finally {
      this.setState({
        isProfileLoading: false,
      });
    }
  }

  render() {
    const { currentUser } = this.state;
    const {
      username,
      fullname,
      joined,
      email,
      avatar,
      gender,
      country,
    } = this.state.profileData;
    const dataForEditProfile = { fullname, email, gender, country, avatar };
    

    return this.state.isProfileLoading ? (
      <div className="container-fluid" style={{ textAlign: "center", marginTop: 15 }}>
        <Spinner
          animation="border"
          variant="light"
          role="status"
          aria-hidden="true"
        />
      </div>
    ) : this.state.profileNotFound ? (
      <div className="profile-not-found container-fluid">
        Sorry, This profile is not available.
      </div>
    ) : (
          <div
            className="profile-page-container container-fluid"
            style={{ padding: 0 }}
          >
            <div className="profile-page">
              <svg
                className="profile-page__background-svg"
                width="479.51715"
                height="613.1131"
                viewBox="0 0 126.87225 162.21951"
                preserveAspectRatio="none"
              >
                <g transform="translate(-0.01338979,-81.822661)">
                  <path
                    d="M -0.02748792,0.09204891 0.06179782,268.57391 c 0.2522457,18.08349 7.57416788,36.01931 14.71456518,52.63532 14.127795,32.87596 40.670217,59.23433 70.693359,78.70313 49.267138,31.94774 107.691868,46.70131 165.714838,55.71484 43.88538,6.81734 89.41321,10.97853 129.63672,29.16714 35.09117,15.74206 51.11257,32.87572 62.55433,46.85797 16.32669,19.95181 36.00661,81.19173 36.19216,81.19222 0,-211.16182 -0.0239,-392.22488 -0.0239,-613.11269694 -151.61719,0 -310.93915,-0.004327 -479.57138792,0.36021585 z"
                    transform="matrix(0.26458333,0,0,0.26458333,0,81.893728)"
                  />
                </g>
              </svg>
              <div className="profile-page__top-section">
                <div>
                  
                <Avatar
                    style={{ 
                      display: 'inline-block',
                      width: '160px',
                      height: '160px',
                      boxShadow: '0 2 4 0 #16191f',
                      borderRadius: '50%'
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
                  {currentUser &&
                    currentUser.username === this.props.match.params.profileId && (
                    <EditIcon 
                    fontSize='large'
                    className='profile-page__editAvatarIcon hvr-buzz-out'   
                    onClick={this.onClickEditAvatar}
                    />
                  )}
                  
                </div>
                <div className="profile-page__immutable-fields">
                  <div className="profile-page__field">
                    <span className="profile-page__label">Username</span>
                    <span className="profile-page__value">{username}</span>
                  </div>
                  <div className="profile-page__field">
                    <span className="profile-page__label">Joined On</span>
                    <span className="profile-page__value">{joined}</span>
                  </div>
                </div>
              </div>
              <div className="profile-page__bottom-section">
                <div className="profile-page__field">
                  <span className="profile-page__label">Fullname</span>
                  <span className="profile-page__value">{fullname}</span>
                </div>
                <div className="profile-page__field">
                  <span className="profile-page__label">Email</span>
                  <span className="profile-page__value">{email}</span>
                </div>
                <div className="profile-page__field">
                  <span className="profile-page__label">Gender</span>
                  <span className="profile-page__value">{gender}</span>
                </div>
                <div className="profile-page__field">
                  <span className="profile-page__label">Country</span>
                  <span className="profile-page__value">{country}</span>
                </div>
                <div className="profile-page__btn-group">
                  {currentUser &&
                    currentUser.username === this.props.match.params.profileId && (
                      <button
                        className="profile-page__edit-profile-btn"
                        onClick={this.onClickEditProfile}
                      >
                        Edit Profile
                      </button>
                    )}
                  <button className="profile-page__view-games-btn">
                    View Games
              </button>
                </div>
              </div>
            </div>
            {
              <CSSTransition
                in={this.state.isEditProfilePopupActive || this.state.isEditAvatarPopupActive}
                classNames="edit-popup"
                timeout={200}
                unmountOnExit
              >
                <div>
                  {this.state.isEditProfilePopupActive &&
                  <EditProfilePopup
                  onClickSave={this.onClickSave}
                  onClickDiscard={this.onClickDiscard}
                  currentUser={currentUser}
                  rerenderProfileWithUpdatedData={
                    this.rerenderProfileWithUpdatedData
                  }
                  {...dataForEditProfile}
                />
                }

                  {this.state.isEditAvatarPopupActive &&
                    <EditAvatarPopup
                    onClickSave={this.onClickSave}
                    onClickDiscard={this.onClickDiscard}
                    currentUser={currentUser}
                    rerenderProfileWithUpdatedData={
                      this.rerenderProfileWithUpdatedData
                    }
                    {...dataForEditProfile}
                  />
                  }
                  
                </div>
              </CSSTransition>
            }
          </div>
        );
  }
}

export default withRouter(Profile);
