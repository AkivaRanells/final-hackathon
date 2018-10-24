import React, { Component } from 'react';
import NavBar from '../NavBar';

class GameBestTags extends Component {

  constructor() {
    super();
    this.state = {
      gameActive: true
    }
  }

  checkForActiveGame = () => {
    if (this.state.gameActive) {
      console.log("1")
    }
    else {
      console.log("2")
    };
  }


  render() {
    return (
      <div>
        <NavBar />
        <div className="game-container">
          {this.checkForActiveGame()}

        </div>
      </div>
    )
  }

}


export default GameBestTags;