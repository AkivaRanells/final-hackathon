import React, { Component } from 'react';
import NavBar from '../NavBar';
import UploadPic from "./UploadPic";


class GameBestTags extends Component {

  constructor() {
    super();
    this.state = {
      gameActive: false
    }
  }

  checkForActiveGame = () => {
    if (this.state.gameActive) {
      console.log("1")
    }
    else {
      return <UploadPic />
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