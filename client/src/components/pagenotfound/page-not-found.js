import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

import './page-not-found.css';
import notFound from '../../images/not-found.json';

const NotFound = _ => {
  return (
    <div id = 'not-found'>
      <Player
        autoplay
        loop
        src = { notFound }
        style = {{
          height: '50%',
          width: '50%',
          margin: 'auto',
        }}
      >
      </Player>
    </div>
  )
}

export default NotFound;
