import React, { Component } from 'react';

import Carousel from 'react-bootstrap/Carousel';

import MagnusCarlsen from '../images/magnus-carlsen.jpg';
import JuditPolgar from '../images/judit-polgar.jpg';
import GarryKaspaov from '../images/garry-kasparov.jpg';


class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <div className='p-3 mb-2 bg-dark text-white'>
          <h1 className = 'text-center'> pbchess </h1>
					<h3 className = 'text-center'> An <span className = 'text-success' >open-source</span> free online chess platform </h3>
        </div>
        <Carousel className = 'text-center'>
          <Carousel.Item>
            <img
              src = { MagnusCarlsen }
              alt = 'Magnus Carlsen'
              className = 'rounded-circle'
            />
            <Carousel.Caption>
              <h3 className = 'text-dark' >Magnus Carlsen</h3>
              <p className = 'text-dark' >Some people think that if their opponent plays a beautiful game, it’s OK to lose. I don’t. You have to be merciless.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src = { JuditPolgar }
              alt = 'Judit Polgar'
              className = 'rounded-circle'
            />

            <Carousel.Caption>
              <h3 className = 'text-dark' >Judit Polgar</h3>
              <p className = 'text-dark' >One can say that in the last decades chess has become more of a sport than of a science. I see it from an artistic point of view.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src = { GarryKaspaov }
              alt = 'Garry Kasparov'
              className = 'rounded-circle'
            />

            <Carousel.Caption>
              <h3 className = 'text-dark' >Garry Kasparov</h3>
              <p className = 'text-dark' >To become good at anything you have to know how to apply basic principles. To become great at it, you have to know when to violate those principles.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

    )
  }
}

export default Home;
