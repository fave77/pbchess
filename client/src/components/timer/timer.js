import React, { forwardRef, useEffect, useImperativeHandle } from "react"; 
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import { useTimer } from 'react-timer-hook';
import './timer.css';


const Timer = forwardRef(({ player, turn, timeLimit, timedout }, ref) => {

  const {
    seconds,
    minutes,
    hours,
    start,
    pause,
    resume
   } = useTimer({ expiryTimestamp: timeLimit, onExpire: () => timedout(player) });

   useImperativeHandle(ref, () => ({
    pauseTimer() {
      pause();
    },
    resumeTimer() {
      resume();
    }
  }));

  useEffect(() => {
    // Start timer from beginning or not
    if(!turn){
      pause();
    }
  }, []);

  const toggleStyles = {
      width: '15px',
      height: '15px',
      marginLeft: '20px',
      marginRight: '12px',
      backgroundColor: turn ? '#8299fd' : 'transparent',
      border: '1px solid white'
  };

  return (
    <Row className="timerContainer">        
        <div className="rounded-circle" style={toggleStyles}>
        </div>
        <h5>
            <Link to={`/@/${player.username}`} target="_blank"> 
                { player.username } 
            </Link>
        </h5>
        <h4 className="mb-0">
            { minutes } : { seconds }
        </h4>
    </Row>
  );
});

export default Timer;