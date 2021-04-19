import React from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import pbchessLogo from '../../images/pbchess-logo.svg';

import './navbar.css';

import { faBookOpen, faChess, faSignInAlt, faUser, faSignOutAlt, faKey} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const renderTooltip = props => {
  let pathname = window.location.href;
  pathname = pathname.slice(pathname.indexOf('://') + 3)
  pathname = pathname.slice(pathname.indexOf('/'))
  return (
    <Tooltip bsPrefix = 'tooltip' {...props} >
      { pathname !== '/'
          ? 'Click to go Home'
          : 'Home'
      }
    </Tooltip>
  );
};

function MyNavbar(props) {
  const { currentUser, logOut } = props;
  return (
    <Navbar collapseOnSelect expand = 'lg' sticky = 'top' className = 'mynavbar navbar-dark'>
      <Navbar.Brand>
        <Link to = { '/' } className = 'navbar-brand'>
          <OverlayTrigger
            placement = 'bottom-start'
            overlay = { renderTooltip }
          >
              <img
                src = { pbchessLogo }
                width = '60em'
                height = '60em'
                className = 'd-inline-block align-top'
                alt = 'pbchess logo'
              />
          </OverlayTrigger>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls = 'basic-navbar-nav' />
      <Navbar.Collapse id = 'basic-navbar-nav'>
        <Nav className="ml-auto" >
          <LinkContainer className="hover-link" to="/play">
            <Nav.Link >Play <FontAwesomeIcon icon={faChess} /></Nav.Link>
          </LinkContainer>
          <LinkContainer className="hover-link" to="/learn">
            <Nav.Link >Learn <FontAwesomeIcon icon={faBookOpen} /></Nav.Link>
          </LinkContainer>
          { currentUser
            ? (
              <NavDropdown
                title = { currentUser.username }
                id = 'collapsible-nav-dropdown'
              >
                <NavDropdown.Item href = { `/@/${currentUser.username}` }>
                  <p className = "mydropdown">Profile <FontAwesomeIcon icon={faUser} /></p>
                </NavDropdown.Item>
                <NavDropdown.Item href = { '/login' } onClick = { logOut }>
                  <p className = "mydropdown">LogOut <FontAwesomeIcon icon={faSignOutAlt} /></p>
                </NavDropdown.Item>
                <NavDropdown.Item href = { `/password/update` }>
                  <p className = "mydropdown">Change Password <FontAwesomeIcon icon={faKey} /></p>
                </NavDropdown.Item>
              </NavDropdown>
            )
            : (
              <LinkContainer className="hover-link" to="/login">
                <Nav.Link >Login <FontAwesomeIcon icon={faSignInAlt} /></Nav.Link>
              </LinkContainer>
            )
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;
