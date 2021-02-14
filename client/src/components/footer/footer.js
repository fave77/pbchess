import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin, faTwitter, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons'; 
import { faHome, faPhone, faFlag, faEnvelope, faInfoCircle, faLock, faAward } from '@fortawesome/free-solid-svg-icons';
import pbchessLogo from '../../images/pbchess-logo.svg';

function Footer(){
  return (
    <footer className="text-center text-white" style={{backgroundColor:'#171a18',width:'100%',bottom: '0'}}>
      <div className="row">
        <div className="col-lg-4" align="left" style={{paddingLeft: '8%'}}>
          <h5 className="text-uppercase"><b style={{color:'rgb(255, 231, 10)'}}><u>About PBCHESS</u></b></h5>
          <img
            src = { pbchessLogo }
            width = '60em'
            height = '60em'
            className = 'd-inline-block align-top'
            alt = 'pbchess logo'
          />
          <p style={{paddingRight:'3%',color:'white'}}>
            An open-sourced free online chess platform.
          </p>
        </div>
        <div className="col-lg-3" align="left" style={{paddingLeft: '8%'}}>
          <h5 className="text-uppercase"><b style={{color:'rgb(255, 231, 10)'}}><u>Quick Links</u></b></h5>
          <ul className="list-unstyled mb-0" >
            <li>
              <a href="#!" style={{color:'white'}}><FontAwesomeIcon icon={faAward} /> Careers</a>
            </li>
            <li>
              <a href="#!" style={{color:'white'}}><FontAwesomeIcon icon={faLock} /> Privacy Policy</a>
            </li>
            <li>
              <a href="/contact" style={{color:'white'}}><FontAwesomeIcon icon={faInfoCircle} /> Terms & Conditions</a>
            </li>
            <li>
              <a href="/contact" style={{color:'white'}}><FontAwesomeIcon icon={faPhone} /> Contact Us</a>
            </li>
          </ul>
        </div>
        <div className="col-lg-5" align="left" style={{paddingLeft: '8%'}}>
          <h5 className="text-uppercase mb-0" ><b style={{color:'rgb(255, 231, 10)'}}><u>Address</u></b></h5>
          <ul className="list-unstyled" style={{marginTop:'1%'}}>
            <li>
              <a href="#!" style={{color:'white'}}><FontAwesomeIcon icon={faHome} /> Some place, New York, NY 56776</a>
            </li>
            <li>
              <a href="#!" style={{color:'white'}}><FontAwesomeIcon icon={faFlag} /> USA</a>
            </li>
            <li>
              <a href="#!" style={{color:'white'}}><FontAwesomeIcon icon={faEnvelope} /> info@example.com</a>
            </li>
            <li>
              <a href="#!" style={{color:'white'}}><FontAwesomeIcon icon={faPhone} /> 1234567890</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="row" style={{backgroundColor:'#0e0f0e'}}>
        <div className="col-md-6">
          <ul style={{display:'flex',listStyleType: 'none',marginTop:'2%',paddingLeft:'20%'}}>
            <li>
              <a href="#!"><FontAwesomeIcon icon={faFacebook} style={{color:'#7ca1f3',fontSize: '2rem',marginRight:'1em'}} /></a>
            </li>
            <li>
              <a href="#!"><FontAwesomeIcon icon={faInstagram} style={{color:'#fbad50',fontSize: '2rem',marginRight:'1em'}} /></a>
            </li>
            <li>
              <a href="#!"><FontAwesomeIcon icon={faLinkedin} style={{color:'#0e89a8',fontSize: '2rem',marginRight:'1em'}} /></a>
            </li>
            <li>
              <a href="#!"><FontAwesomeIcon icon={faYoutube} style={{color:'#FF0000',fontSize: '2rem',marginRight:'1em'}} /></a>
            </li>
            <li>
              <a href="#!"><FontAwesomeIcon icon={faTwitter} style={{color:'#00abee',fontSize: '2rem'}} /></a>
            </li>
          </ul>
        </div>
        <div className="col-md-6" style={{marginTop:'1%'}}>
          <ul className="list-unstyled list-inline"><li style={{color:'white'}}>Copyright &copy; <script>document.write(new Date().getFullYear())</script> All rights reserved.</li></ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
