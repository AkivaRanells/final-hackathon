import React, { Component } from 'react';
import '../../styles/instructions.css'

class AdminInstructions extends Component {

  render() {
    return (
      <div>
        <h2>Instructions!</h2>

        <div className="admin-instructions-1 instructions">
          This is your chance to create the game!
All you have to do is find a picture online, and submit it.
 </div>

        <div className="admin-instructions-2 instructions">

          When you are done you'll wait while the other players are selecting pics according to the tags YOUR pic provided!
            </div>
        <div className="admin-instructions-3 instructions">
          After all players submit their picture you will be shown all of the players submition, and choose the one you think is the best one!
        {/* Each of the players get one vote only, so vote wisely! */}
        </div>
        <div className="admin-instructions-4 instructions">
          After time is up (or all the players voted), the winner will be anounced!

            </div>
      </div>
    )
  }

}


export default AdminInstructions;