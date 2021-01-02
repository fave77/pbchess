import React, { Component } from 'react';

import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';

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
            <Card style={{ width: "75%", maxWidth: '700px' }}>
              <Card.Img variant='top' src={ MagnusCarlsen } alt = 'Magnus Carlsen' style={{ width: '50%', margin: 'auto' }} className='rounded-circle' />
              <Card.Body>
                <Card.Title>
                Magnus Carlsen
                </Card.Title>
                <Card.Text className='text-secondary'>
                Some people think that if their opponent plays a beautiful game, it’s OK to lose. I don’t. You have to be merciless.
                </Card.Text>
              </Card.Body>
            </Card>
          </Carousel.Item>
          <Carousel.Item>
            <Card style={{ width: "75%", maxWidth: '700px' }}>
              <Card.Img variant='top' src={ JuditPolgar } alt='Judit Polgar' style={{ width: '50%', margin: 'auto' }} className='rounded-circle' />
              <Card.Body>
                <Card.Title>
                Judit Polgar
                </Card.Title>
                <Card.Text className='text-secondary'>
                One can say that in the last decades chess has become more of a sport than of a science. I see it from an artistic point of view.
                </Card.Text>
              </Card.Body>
            </Card>
          </Carousel.Item>
          <Carousel.Item>
            <Card style={{ width: '75%', maxWidth: '700px' }}>
              <Card.Img variant='top' src={ GarryKaspaov } alt='Garry Kasparov' style={{ width: '50%', margin: 'auto' }} className='rounded-circle' />
              <Card.Body>
                <Card.Title>
                Garry Kasparov
                </Card.Title>
                <Card.Text className='text-secondary'>
                To become good at anything you have to know how to apply basic principles. To become great at it, you have to know when to violate those principles.
                </Card.Text>
              </Card.Body>
            </Card>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}

export default Home;
