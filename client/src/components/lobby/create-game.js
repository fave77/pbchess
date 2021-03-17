import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Image from 'react-bootstrap/Image';

import clipboard from '../../images/clipboard.svg';

class CreateGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false
    }
  }

  copyToClipBoard() {
    navigator.clipboard.writeText(this.props.socketId);
    this.setState({
      copied: true
    })
  }

  render() {
    return (
      this.props.loading
        ? <Card bg = 'dark' text = 'white' border = 'dark'>
            <Card.Header>Share your Game ID for other players to join ...</Card.Header>
            <Card.Body>
              <blockquote>
                <OverlayTrigger
                  placement = 'bottom'
                  overlay = {
                    <Tooltip id = 'button-tooltip-2'>
                      { this.state.copied
                          ? 'Copied!'
                          : 'Click to Copy'
                      }
                    </Tooltip>
                  }
                >
                  {({ ref, ...triggerHandler }) => (
                    <Button
                      variant = 'secondary'
                      {...triggerHandler}
                      className = 'd-inline-flex align-items-center'
                      onClick = { _ => this.copyToClipBoard() }
                    >
                      <span className = 'ml-1'>{ this.props.socketId }</span>
    
                      <Image
                        ref = { ref }
                        thumbnail
                        src = { clipboard }
                        margin
                      />
                    </Button>
                  )}
                </OverlayTrigger>
              </blockquote>
            </Card.Body>
            <Button 
                variant = 'link'
                className = 'ml-auto py-0'
                onClick = { _ => this.props.showJoin() }
            >
              Join instead?
            </Button>
          </Card>
        : <Card bg = 'dark' text = 'white' border = 'dark'>
            { /* TODO: Options for type of game, timer needs to be implemented */ }
            <div>
              <Button 
                variant = 'pbchess'
                onClick = { _ => this.props.createGame() }
              >
                Create
              </Button>
            </div>
          </Card>
    
    );
  }
}

export default CreateGame;
