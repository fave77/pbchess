import React from 'react';
import './videos.css';
const Videos=() => {
    const availableHt = window.innerHeight;
    return (
        <div className='chessBoard'>
            <iframe src='https://lichess.org/tv/frame?theme=blue-marble&bg=dark' style={{width: availableHt - 180, height: availableHt - 150}} allowtransparency='true' frameborder='0'></iframe>
        </div>
    );
};
export default Videos;