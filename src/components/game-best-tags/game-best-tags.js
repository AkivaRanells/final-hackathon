import React, { Component } from 'react';
import NavBar from '../navBar';
import UploadPic from "./UploadPic";


class GameBestTags extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: "",
      gameActive: false,
      imageTags: []
    }
  }

  checkForActiveGame = () => {
    if (this.state.gameActive) {
      console.log("1")
    }
    else {
      return <UploadPic inputValue={this.state.inputValue} changeInputValue={this.changeInputValueInLocalState} getImageTags={this.getImageTags} />
    };
  }

  getImageTags = () => {
    if (this.state.inputValue !== "") {
      this.props.getImageTags(this.state.inputValue)
        .then((response) => {
          // this.setState({imageTags: })
          console.log(response.data.concepts);
        })
        .catch(function (error) {
          console.log(error)
        })
    } else {
    
    alert("please pick a picture online!");

  }}




  changeInputValueInLocalState = (event) => {
    let newState = { ...this.state };
    newState.inputValue = event.target.value;
    this.setState(newState);
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