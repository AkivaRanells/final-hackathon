import React, { Component } from 'react';
import NavBar from '../NavBar';
import UploadPic from "./UploadPic";


class GameBestTags extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: ""
    }
  }

getImageTags = () => {
  if (this.state.inputValue !== "") {
  this.props.getImageTags(this.state.inputValue);
} else {
  alert ("please pick a picture online!");
}
}


changeInputValueInLocalState = (event) => {
  let newState = {...this.state};
  newState.inputValue = event.target.value;
  this.setState(newState);
}

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
        <input type="text" value={this.state.inputValue} onChange={this.changeInputValueInLocalState}/>
        <button onClick={this.getImageTags}>Get Tags!</button> 
        <div className="game-container">
          {this.checkForActiveGame()}

        </div>
      </div>
    )
  }

}


export default GameBestTags;