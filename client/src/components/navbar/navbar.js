import React from 'react';
import { Link } from 'react-router-dom';
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
          ? 'go home!'
          : 'u\'re home!'
      }
    </Tooltip>
  );
};

function MyNavbar(props) {
  const { currentUser, logOut } = props;
  console.log(currentUser)
  return (
    <Navbar expand = 'lg' sticky = 'top' className = 'mynavbar navbar-dark'>
      <Navbar.Brand>
        <Link to = { '/' } className = 'navbar-brand'>
          <OverlayTrigger
            placement = 'right-end'
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
        <Nav className = 'ml-auto'>
          <Nav.Link>
            <Link to = { '/live' }>
              Play
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link to = { '/learn' }>
              Learn
            </Link>
          </Nav.Link>
          { currentUser
            ? (
              <NavDropdown
                title = { currentUser.username }
                id = 'collapsible-nav-dropdown'
              >
                <NavDropdown.Item>
                  <Link to = { `/@/${currentUser.username}` }> Profile </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <a href = '/login' onClick = { logOut }>
                    LogOut
                  </a>
                </NavDropdown.Item>
              </NavDropdown>
            )
            : (
              <Nav.Link>
                <Link to = { '/login' }>
                  Login
                </Link>
              </Nav.Link>
            )
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;
