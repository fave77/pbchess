import React from 'react';
import { Link} from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import pbchessLogo from '../../images/pbchess-logo.svg';
import './navbar.css';

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
}

function MyNavbar(props) {
  const { currentUser, logOut } = props;

  return (
    <Navbar collapseOnSelect expand = 'lg' sticky = 'top' className = 'mynavbar navbar-dark'>
      <Navbar.Brand>
        <Link to = { '/' } className = 'navbar-brand'>
          <OverlayTrigger placement = 'bottom-start' overlay = { renderTooltip }>
            <LinkContainer to="/">
              <Nav.Link ><img
                src = { pbchessLogo }
                width = '60em'
                height = '60em'
                className = 'd-inline-block align-top'
                alt = 'pbchess logo'
              /></Nav.Link>
            </LinkContainer>
          </OverlayTrigger>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls = 'basic-navbar-nav' />
      <Navbar.Collapse id = 'basic-navbar-nav'>
        <Nav className="ml-auto" >
          <LinkContainer to="/play">
            <Nav.Link >Play</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/learn">
            <Nav.Link >Learn</Nav.Link>
          </LinkContainer>
          { currentUser
            ? (
              <NavDropdown
                title = { currentUser.username }
                id = 'collapsible-nav-dropdown'
              >
                <NavDropdown.Item href = { `/@/${currentUser.username}` }>
                  <p className = "mydropdown">Profile</p>
                </NavDropdown.Item>
                <NavDropdown.Item href = { '/login' } onClick = { logOut }>
                  <p className = "mydropdown">LogOut</p>
                </NavDropdown.Item>
                <NavDropdown.Item href = { `/password/update` }>
                  <p className = "mydropdown">Change Password</p>
                </NavDropdown.Item>
              </NavDropdown>
            )
            : (
              <LinkContainer to="/login">
                <Nav.Link >Login</Nav.Link>
              </LinkContainer>
            )
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
)
}

export default MyNavbar;
