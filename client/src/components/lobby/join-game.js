import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';

class JoinGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: '',
      joiningError: false,
      loading: false
    }
  }


  handleClose() {
    this.setState({
      joiningError: false,
      loading: false
    });
  }

  componentDidMount() {
    this.props.socket.on('cannot_join_game', msg => {

      this.setState({
        joiningError: msg
      })
    });
  }

  render() {
    return (
      <div>
        <Card bg = 'dark' text = 'white' border = 'dark'>
        { /* TODO: Options for type of game, timer needs to be implemented */ }

          <Row className = "mt-2">
            <Col>
              <Form.Control
                placeholder = 'Enter game ID ...'
                onChange = { e => this.setState({ gameId: e.target.value }) }
              />
            </Col>
            <Col>
              <Button
                variant = 'pbchess'
                type = 'submit'
                onClick = { _ => 
                  {
                    this.props.joinGame(this.state.gameId);
                    this.setState({
                      loading: true
                    });
                  }
                }
              >
                Join
              </Button>
            </Col>
          </Row>
          { this.state.loading // renders loader
              ? <div>
                  <Spinner animation = 'border' role = 'status'>
                    <span className = 'sr-only'>Loading...</span>
                  </Spinner>
                </div>
              : ''
          }
          <Button 
            variant = 'link'
            className = 'ml-auto mt-3 d-block'
            onClick = { _ => this.props.showCreate() } 
          >
            Create a game instead?
          </Button>
        </Card>
        <Modal show = { Boolean(this.state.joiningError) } onHide = { _ => this.handleClose() } >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <div style = {{ textAlign: 'center', cursor: 'pointer' }}>
              <span role = 'presentation'>
                <p> { this.state.joiningError } </p>
              </span>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default JoinGame;
