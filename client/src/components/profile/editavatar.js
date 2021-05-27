import React, { Component } from 'react';
import configAPI from '../../configs/api.config';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-validation/build/form';
import Select from 'react-validation/build/select';
import Button from 'react-validation/build/button';
import authHeader from '../../services/auth.header';
import Alert from 'react-bootstrap/Alert';
import Avatar from 'avataaars';
import './editavatar.css';

const API_URL = configAPI();

class EditAvatarPopup extends Component {
    constructor(props) {
        super(props);

    this.state = {
        isEditedProfileSaving: false,
        avatar:'',
        top: '',
        accessories: '',
        hairColor: '',
        facialHair: '',
        clothes: '',
        clothColor: '',
        eyes: '',
        eyebrow: '',
        mouth: '',
        skin: '',
        alertSuccess: {
            isActive: false,
            msg: ''
        },
        alertFailure: {
            isActive: false,
            msg: ''
        }

    }
}
    onChangeTop = (e) => {
        this.setState({
            top: e.target.value
        })
        }
    onChangeAccessories = (e) => {
        this.setState({
            accessories: e.target.value
        })
        }
    onChangeHairColor = (e) => {
        this.setState({
            hairColor: e.target.value
        })
        }
    onChangefacialHair = (e) => {
        this.setState({
            facialHair: e.target.value
        })
        }
    onChangeClothes = (e) => {
        this.setState({
            clothes: e.target.value
        })
        }
    onChangeClothColor = (e) => {
        this.setState({
            clothColor: e.target.value
        })
        }
    onChangeEyes = (e) => {
        this.setState({
            eyes: e.target.value
        })
        }
    onChangeEyebrow = (e) => {
        this.setState({
            eyebrow: e.target.value
        })
        }
    onChangeMouth = (e) => {
        this.setState({
            mouth: e.target.value
        })
        }
    onChangeSkin = (e) => {
        this.setState({
            skin: e.target.value
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

    componentDidMount() {
        const { avatar } = this.props;
        this.setState({
            avatar,
            top: avatar.top,
            accessories: avatar.accessories,
            hairColor: avatar.hairColor,
            facialHair: avatar.facialHair,
            clothes: avatar.clothes,
            eyes: avatar.eyes,
            eyebrow: avatar.eyebrow,
            mouth: avatar.mouth,
            skin: avatar.skin,
            clothColor: avatar.clothColor,
        });
    }


    updateAvatar= (e) => {
        var avatar = {...this.state.avatar}
        avatar.top = this.state.top 
        avatar.accessories = this.state.accessories
        avatar.hairColor = this.state.hairColor
        avatar.facialHair = this.state.facialHair
        avatar.clothes = this.state.clothes
        avatar.eyes = this.state.eyes
        avatar.eyebrow = this.state.eyebrow
        avatar.mouth = this.state.mouth
        avatar.skin = this.state.skin
        avatar.clothColor= this.state.clothColor
        const { fullname, email, gender, country} = this.props;

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

    async handleAvatarEdit(e) {
        e.preventDefault();

        this.setState({
            isEditedProfileSaving: true 
        })
        try {
            const updateAvatarResponse =  await this.updateAvatar();
            const {success, msg, ...updatedProfileData} = updateAvatarResponse.data; 
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
    render() {
      {console.log(this.state)}
        const {alertSuccess, alertFailure, top, accessories, hairColor, facialHair, clothes, clothColor,eyes ,eyebrow ,mouth, skin} = this.state;
        return (
        <div className='edit-avatar-popup'>
        <h3 className='edit-avatar-popup__title'>Customize your Avatar</h3>
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
            topType={top}
            accessoriesType={accessories}
            hairColor={hairColor}
            facialHairType={facialHair}
            clotheType={clothes}
            eyeType={eyes}
            eyebrowType={eyebrow}
            mouthType={mouth}
            skinColor={skin}
            clotheColor={clothColor}
            />
        
        <Form 
          className='edit-avatar-popup__form'
          name = 'edit_profile'
          onSubmit = { this.handleAvatarEdit.bind(this) }
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
          {/* Avatar Properties */}
          <label className='edit-avatar-popup__input-label-avatar' htmlFor="edit_top">Hair</label>
          <Select
            className='edit-avatar-popup__input form-control' 
            id='edit_top' value={top}
            name='edit_top'
            onChange={this.onChangeTop} 
          >
             <option value="">Select TopType</option>
             <option value="Eyepatch">Eyepatch</option>
             <option value="Hat">Hat</option>
             <option value="Hijab">Hijab</option>
             <option value="Turban">Turban</option>
             <option value="WinterHat1">WinterHat1</option>
             <option value="WinterHat2">WinterHat2</option>
             <option value="WinterHat3">WinterHat3</option>
             <option value="WinterHat4">WinterHat4</option>
             <option value="LongHairBigHair">LongHairBigHair</option>
             <option value="LongHairBob">LongHairBob</option>
             <option value="LongHairBun">LongHairBun</option>
             <option value="LongHairCurly">LongHairCurly</option>
             <option value="LongHairCurvy">LongHairCurvy</option>
             <option value="LongHairDreads">LongHairDreads</option>
             <option value="LongHairFrida">LongHairFrida</option>
             <option value="LongHairFro">LongHairFro</option>
             <option value="LongHairFroBand">LongHairFroBand</option>
             <option value="LongHairNotTooLong">LongHairNotTooLong</option>
             <option value="LongHairShavedSides">LongHairShavedSides</option>
             <option value="LongHairMiaWallace">LongHairMiaWallace</option>
             <option value="LongHairStraight">LongHairStraight</option>
             <option value="LongHairStraight2">LongHairStraight2</option>
             <option value="LongHairStraightStrand">LongHairStraightStrand</option>
             <option value="ShortHairDreads01">ShortHairDreads01</option>
             <option value="ShortHairDreads02">ShortHairDreads02</option>
             <option value="ShortHairFrizzle">ShortHairFrizzle</option>
             <option value="ShortHairShaggyMullet">ShortHairShaggyMullet</option>
             <option value="ShortHairShortCurly">ShortHairShortCurly</option>
             <option value="ShortHairShortFlat">ShortHairShortFlat</option>
             <option value="ShortHairShortRound">ShortHairShortRound</option>
             <option value="ShortHairShortWaved">ShortHairShortWaved</option>
             <option value="ShortHairSides">ShortHairSides</option>
             <option value="ShortHairTheCaesar">ShortHairTheCaesar</option>
             <option value="ShortHairTheCaesarSidePart">ShortHairTheCaesarSidePart</option>
          </Select>


          <label className='edit-avatar-popup__input-label-avatar' htmlFor="edit_accessories">👓 Accessories</label>
          <Select
            className='edit-avatar-popup__input form-control' 
            id='accessories_Type' value={accessories}
            name='accessories_Type'
            onChange={this.onChangeAccessories} 
          >
             <option value="Blank">Blank</option>
             <option value="Kurt">Kurt</option>
             <option value="Prescription01">Prescription01</option>
             <option value="Prescription02">Prescription02</option>
             <option value="Round">Round</option>
             <option value="Sunglasses">Sunglasses</option>
             <option value="Wayfarers">Wayfarers</option>
          </Select>


          <label className='edit-avatar-popup__input-label-avatar' htmlFor="edit_hairColor">💈 Hair Color</label>
          <Select
            className='edit-avatar-popup__input form-control' 
            id='hair_color' value={hairColor}
            name='hair_color'
            onChange={this.onChangeHairColor} 
          >
            <option value="Auburn">Auburn</option>
            <option value="Black">Black</option>
            <option value="Blonde">Blonde</option>
            <option value="BlondeGolden">BlondeGolden</option>
            <option value="Brown">Brown</option>
            <option value="BrownDark">BrownDark</option>
            <option value="Platinum">Platinum</option>
            <option value="Red">Red</option>
          </Select>


          <label className='edit-avatar-popup__input-label-avatar' htmlFor="edit_facialHair">Facial Hair Type</label>
          <Select
            className='edit-avatar-popup__input form-control' 
            id='hair_type' value={facialHair}
            name='hair_color'
            onChange={this.onChangefacialHair} 
          >
             <option value="Blank">Blank</option>
             <option value="BeardMedium">BeardMedium</option>
             <option value="BeardLight">BeardLight</option>
             <option value="BeardMajestic">BeardMajestic</option>
             <option value="MoustacheFancy">MoustacheFancy</option>
             <option value="MoustacheMagnum">MoustacheMagnum</option>
          </Select>


          <label className='edit-avatar-popup__input-label-avatar' htmlFor="edit_clothes">👔 Clothes</label>
          <Select
            className='edit-avatar-popup__input form-control' 
            id='cloth_type' value={clothes}
            name='cloth_type'
            onChange={this.onChangeClothes} 
          >
            <option value="BlazerShirt">BlazerShirt</option>
            <option value="BlazerSweater">BlazerSweater</option>
            <option value="CollarSweater">CollarSweater</option>
            <option value="GraphicShirt">GraphicShirt</option>
            <option value="Hoodie">Hoodie</option>
            <option value="Overall">Overall</option>
            <option value="ShirtCrewNeck">ShirtCrewNeck</option>
            <option value="ShirtScoopNeck">ShirtScoopNeck</option>
            <option value="ShirtVNeck">ShirtVNeck</option>
          </Select>


          <label className='edit-avatar-popup__input-label-avatar' htmlFor="edit_cloth_color"> Cloth Color</label>
          <Select
            className='edit-avatar-popup__input form-control' 
            id='cloth_color' value={clothColor}
            name='cloth_color'
            onChange={this.onChangeClothColor} 
          >
           <option value="Black">Black</option>
           <option value="Blue01">Blue01</option>
           <option value="Blue02">Blue02</option>
           <option value="Blue03">Blue03</option>
           <option value="Gray01">Gray01</option>
           <option value="Gray02">Gray02</option>
           <option value="Heather">Heather</option>
           <option value="PastelBlue">PastelBlue</option>
           <option value="PastelGreen">PastelGreen</option>
           <option value="PastelOrange">PastelOrange</option>
           <option value="PastelRed">PastelRed</option>
           <option value="PastelYellow">PastelYellow</option>
           <option value="Pink">Pink</option>
           <option value="Red">Red</option>
           <option value="White">White</option>
          </Select>


          <label className='edit-avatar-popup__input-label-avatar' htmlFor="edit_eyes">👁 Eyes</label>
          <Select
            className='edit-avatar-popup__input form-control' 
            id='eyes_type' value={eyes}
            name='eyes_type'
            onChange={this.onChangeEyes} 
          >
            <option value="Close">Close</option>
            <option value="Cry">Cry</option>
            <option value="Default">Default</option>
            <option value="Dizzy">Dizzy</option>
            <option value="EyeRoll">EyeRoll</option>
            <option value="Happy">Happy</option>
            <option value="Hearts">Hearts</option>
            <option value="Side">Side</option>
            <option value="Squint">Squint</option>
            <option value="Surprised">Surprised</option>
            <option value="Wink">Wink</option>
            <option value="WinkWacky">WinkWacky</option>
          </Select>


          <label className='edit-avatar-popup__input-label-avatar' htmlFor="edit_eyebrow">✏️ Eyebrow</label>
          <Select
            className='edit-avatar-popup__input form-control' 
            id='eyebrow_type' value={eyebrow}
            name='eyebrow_type'
            onChange={this.onChangeEyebrow} 
          >
           <option value="Angry">Angry</option>
           <option value="AngryNatural">AngryNatural</option>
           <option value="Default">Default</option>
           <option value="DefaultNatural">DefaultNatural</option>
           <option value="FlatNatural">FlatNatural</option>
           <option value="RaisedExcited">RaisedExcited</option>
           <option value="RaisedExcitedNatural">RaisedExcitedNatural</option>
           <option value="SadConcerned">SadConcerned</option>
           <option value="SadConcernedNatural">SadConcernedNatural</option>
           <option value="UnibrowNatural">UnibrowNatural</option>
           <option value="UpDown">UpDown</option>
           <option value="UpDownNatural">UpDownNatural</option>
          </Select>


          <label className='edit-avatar-popup__input-label-avatar' htmlFor="edit_mouth">👄 Mouth</label>
          <Select
            className='edit-avatar-popup__input form-control' 
            id='mouth_type' value={mouth}
            name='mouth_type'
            onChange={this.onChangeMouth} 
          >
          <option value="Concerned">Concerned</option>
          <option value="Default">Default</option>
          <option value="Disbelief">Disbelief</option>
          <option value="Eating">Eating</option>
          <option value="Grimace">Grimace</option>
          <option value="Sad">Sad</option>
          <option value="ScreamOpen">ScreamOpen</option>
          <option value="Serious">Serious</option>
          <option value="Smile">Smile</option>
          <option value="Tongue">Tongue</option>
          <option value="Twinkle">Twinkle</option>
          <option value="Vomit">Vomit</option>
          </Select>


          <label className='edit-avatar-popup__input-label-avatar' htmlFor="edit_mouth">🎨 Skin</label>
          <Select
            className='edit-avatar-popup__input form-control' 
            id='skin_type' value={skin}
            name='skin_type'
            onChange={this.onChangeSkin} 
          >
         <option value="Tanned">Tanned</option>
         <option value="Yellow">Yellow</option>
         <option value="Pale">Pale</option>
         <option value="Light">Light</option>
         <option value="Brown">Brown</option>
         <option value="DarkBrown">DarkBrown</option>
         <option value="Black">Black</option>
          </Select>
          <div className="edit-avatar-popup__btn-group">
            { 
              this.state.isEditedProfileSaving ? (
                <button className="edit-avatar-popup__save-btn" disabled>
                  Saving{" "}<Spinner animation='border' size='sm' as='span' variant='dark' role='status' />
                </button>
              ) : (
                  <Button className="edit-avatar-popup__save-btn">
                    Save
                  </Button>
                )
            }
            <button 
              className="edit-avatar-popup__discard-btn" 
              onClick={this.props.onClickDiscard} 
              disabled={this.state.isEditedProfileSaving}
            >
              Discard
            </button>
          </div>

        </Form>
        
        </div>

            
        )
    }    
}

export default EditAvatarPopup;
