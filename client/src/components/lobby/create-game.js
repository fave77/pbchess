import React from 'react';
import {Card,CardDeck} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Image from 'react-bootstrap/Image';
import Slider, { SliderTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';
import './create-game.css'
import Piece from 'react-chess-pieces';


import clipboard from '../../images/clipboard.svg';

const { Handle } = Slider;

class CreateGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false,
      gametime: 0,
      category: '',
      color: 'white',
    }
  }
  
  handleBlackClick = () =>{
    this.setState({color: 'black'})
    if(this.state.color === 'black'){
      document.getElementsByClassName("black-king")[0].style.backgroundColor="rgb(63, 70, 70)"
    }
    
  }
  handleWhiteClick = () =>{
    this.setState({color: 'white'})
  
    if(this.state.color === 'white'){
      document.getElementsByClassName("white-king")[0].style.backgroundColor="rgb(63, 70, 70)"
    }
    
  }

  copyToClipBoard() {
    navigator.clipboard.writeText(this.props.socketId);
    this.setState({
      copied: true
    })
  }

  onChangeSlider = (e) => {
    this.setState({
      gametime: e
    })
  }

  handleCreate = () => {
    const {gametime,category} = this.state
    if(gametime !== 0)
    {
      if(gametime >=1 && gametime <=2){
        this.setState({
          category: "Bullet"
        })
      }
      else if(gametime >=3 && gametime <= 7){
        this.setState({
          category: "Blitz"
        })
      }
      else{
        this.setState({
          category: "Rapid"
        })
      }
       this.props.createGame(gametime,category)
    }
    else{
      alert("Gametime cannot be zero")
    }
    console.log("this worked");
  }

  handle = props => {
    const { value, dragging, index, ...restProps } = props;
    return (
      <SliderTooltip
        prefixCls="rc-slider-tooltip"
        overlay={`${value} min`}
        visible={dragging}
        placement="top"
        key={index}
      >
        <Handle value={value} {...restProps} />
      </SliderTooltip>
    );
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
              <Card.Body>
              <div className="card-title h5" >Select Game Time </div>
              <Card style={{backgroundColor: '#586169'}} text = 'white' border = 'dark'>
                
                <Slider
                  min = {0}
                  max = {15}
                  value = {this.state.gametime} 
                  onChange = {this.onChangeSlider}
                  handle={this.handle}
                  />
                  <h6>Minutes per side: {this.state.gametime}</h6>
              </Card>
              <br />
              <div className="card-title h5" >Select Your Color </div>
              <CardDeck>
                <Card style={{backgroundColor: '#586169'}} text = 'white' border = 'dark'>
                  <div className="black-king" onClick={ this.handleBlackClick }>
                  <Piece  piece='k' />
                  </div>                
                </Card>
                <Card style={{backgroundColor: '#586169'}} text = 'white' border = 'dark'>
                  <div className="white-king" onClick={ this.handleWhiteClick }>
                  <Piece piece='K' />
                  </div>
                
                </Card>
              </CardDeck>
              
              
              
              <br />
              <Button 
                variant = 'pbchess'
                onClick = { this.handleCreate }
              >
                Create
              </Button>
              </Card.Body>
              
            </div>
          </Card>
    
    );
  }
}

export default CreateGame;
