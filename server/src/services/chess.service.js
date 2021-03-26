// For validating pawn promotion
const validatePawnPromotion = (socket, chess, pendingMove) => {
  const moves = chess.moves({ verbose: true })
    for (let i = 0, len = moves.length; i < len; i++) {
      if (moves[i].flags.indexOf("p") !== -1 && moves[i].from === pendingMove.from) {
        socket.emit('promotion', pendingMove);
        return true;
      }
    }
  return false;
};

// For evaluating games which ended
const evaluateGame = (chess, timedoutPlayer=undefined) => {
  
  // Timeout evaluation
  if(!chess){
    if(!timedoutPlayer)
      throw new Error('Either Chess state or timedout player details must be provided!');    
    return {
      result: 'timeout',
      timedoutPlayer
    }
  }

  // Chess game evaluation
  if (chess.in_checkmate()) {
    return {
      result: 'checkmate'
    };
  } else if (chess.in_stalemate()) {
    return {
      result: 'stalemate'
    };
  } else if (chess.in_threefold_repetition()) {
    return {
      result: 'threefold repetition'
    };
  } else if (chess.insufficient_material()) {
    return {
      result: 'insufficient material'
    };
  } else {
    return {
      result: '50 move rule'
    };
  }

};

module.exports = {
  validatePawnPromotion,
  evaluateGame
};
