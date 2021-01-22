import React, { Component } from 'react';

import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';

import { Player } from '@lottiefiles/react-lottie-player';

import MagnusCarlsen from '../../images/magnus-carlsen.jpg';
import JuditPolgar from '../../images/judit-polgar.jpg';
import GarryKaspaov from '../../images/garry-kasparov.jpg';

import './home.css';
import homebg from '../../images/homebg.svg';
import chessboard from '../../images/chessboard.png';
import homecircles from '../../images/homecircles.json';
import homeblobs from '../../images/homeblobs.json';


class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <img
          src={homebg}
          alt='Homepage Background Top'
          id='homebg'
        />
        <img
          src={chessboard}
          alt='chessboard'
          id='chessboard'
        />
        <Player
          autoplay
          loop
          src={homecircles}
          style={{
            height: '70%',
            width: '70%',
            position: 'absolute',
            marginTop: '20%',
            zIndex: -1
          }}
        >
        </Player>
        <Player
          autoplay
          loop
          src={homeblobs}
          style={{
            height: '10em',
            width: '10em',
            position: 'absolute',
            marginTop: '40%',
            marginLeft: '55%',
            zIndex: -1
          }}
        >
        </Player>
        <div className='p-3 mb-2 text-white title'>
          <h1> pbchess </h1>
          <h3> An open-sourced free online chess platform </h3>
        </div>
        <Carousel className='text-center'>
          <Carousel.Item>
            <Card bsPrefix='mycard' >
              <Card.Img variant='top' src={MagnusCarlsen} alt='Magnus Carlsen' style={{ width: '50%', margin: 'auto' }} className='rounded-circle' />
              <Card.Body>
                <Card.Title>
                  Magnus Carlsen
                </Card.Title>
                <Card.Text>
                  <q>Some people think that if their opponent plays a beautiful game, it’s OK to lose. I don’t. You have to be merciless.</q>
                </Card.Text>
              </Card.Body>
            </Card>
          </Carousel.Item>
          <Carousel.Item>
            <Card bsPrefix='mycard' >
              <Card.Img variant='top' src={JuditPolgar} alt='Judit Polgar' style={{ width: '50%', margin: 'auto' }} className='rounded-circle' />
              <Card.Body>
                <Card.Title>
                  Judit Polgar
                </Card.Title>
                <Card.Text>
                  <q>One can say that in the last decades chess has become more of a sport than of a science. I see it from an artistic point of view.</q>
                </Card.Text>
              </Card.Body>
            </Card>
          </Carousel.Item>
          <Carousel.Item>
            <Card bsPrefix='mycard' >
              <Card.Img variant='top' src={GarryKaspaov} alt='Garry Kasparov' style={{ width: '50%', margin: 'auto' }} className='rounded-circle' />
              <Card.Body>
                <Card.Title>
                  Garry Kasparov
                </Card.Title>
                <Card.Text>
                  <q>To become good at anything you have to know how to apply basic principles. To become great at it, you have to know when to violate those principles.</q>
                </Card.Text>
              </Card.Body>
            </Card>
          </Carousel.Item>
        </Carousel>

        <div className="footer">
          <a className="link" href="https://www.gnu.org/licenses/gpl-3.0.en.html">GPLv3 License</a>
          <a className="link" href="https://github.com/fave77/pbchess">Support us</a>
          <p>Made with ❤️ for the chess community</p>

        </div>
      </div>

    );
  }
}

export default Home;
