import React, { Component } from "react"; 
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import './user.css';

class User extends Component {
  render() {
    const toggleStyles = {
       width: '15px',
       height: '15px',
       marginLeft: '20px',
       marginRight: '12px',
       backgroundColor: this.props.turn ? '#8299fd' : 'transparent',
       border: '1px solid white'
    };

    return (
        <Row className="userContainer">
            <div className="rounded-circle" style={toggleStyles}>
            </div>
            <h5>
                <Link to={`/@/${this.props.player.username}`} target="_blank"> 
                    {this.props.player.username} 
                </Link>
            </h5>
        </Row>
    );
  }
}

export default User;