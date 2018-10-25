import React, { Component } from 'react';

class PlayerInstructions extends Component {

  render() {
    return (
      <div>
        <h2>Player instructions!</h2>

        <div className="player-instructions-1 instructions">
          As you are reading this, one of the players is picking a picture for the game.
       </div>

        <div className="player-instructions-2 instructions">

          When he is done you'll see a collection of tags describing the selected pic.
          Your job is to submit for a picture that'll fit the most tags!
              </div>
        <div className="player-instructions-3 instructions">
          After all players submit their picture you will be shown all of the players submition, and choose the one you think is the best one!
          {/* Each of the players get one vote only, so vote wisely! */}
                  </div>
        <div className="player-instructions-4 instructions">
          After time is up (or all the players voted), the winner will be anounced!

              </div>
      </div>
    )
  }
}


export default PlayerInstructions;