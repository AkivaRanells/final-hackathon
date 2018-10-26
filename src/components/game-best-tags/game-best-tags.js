import React, { Component } from 'react';
import NavBar from '../navBar';
import UploadPic from "./UploadPic";
import SocketPage from './SocketPage';
import AdminInstructions from './adminInstructions';
import PlayerInstructions from './playerInstructions';
import Timer from './timer';
import Images from './images';



class GameBestTags extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: "",
      gameActive: true,
      imageTags: ["demo", "tags", "that", "need", "to", "be", "deleted"]
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
          let tags = response.data.concepts.map(tag => tag.name)
          this.setState({ imageTags: tags })
        })
        .catch(function (error) {
          console.log(error)
        })
    } else {

      alert("please pick a picture online!");
    }
  }

  displayTags = () => {
    if (this.state.imageTags !== "" || this.state.imageTags !== null) {
      return this.state.imageTags.slice(0, 15).map(tag =>
        <span> --{tag}-- </span>
      )
    }
  }

  displayImages = () => {
    if (this.state.imageTags !== "" || this.state.imageTags !== null) {
      return this.state.imageTags.slice(0, 15).map(tag =>
        <span> --Image!-- </span>

      )
    }
  }

  winningImage = () => {
    return <p>Here's the winning pic!</p>
  }

  changeInputValueInLocalState = (event) => {
    let newState = { ...this.state };
    newState.inputValue = event.target.value;
    this.setState(newState);
  }

  isAdmin = (value) => {
    this.props.isAdmin(value)
  }

  render() {
    let adminInstructions = null;
    let playerInstructions = null;
    let uploadPic = null;
    let timer = null;
    let tags = null;
    let images = null;
    let winningImage = null;

    if (this.props.isAdminState && this.props.gamePhase === 0) {
      //admin phase 0
      adminInstructions = <AdminInstructions />
      uploadPic = <UploadPic inputValue={this.state.inputValue} changeInputValue={this.changeInputValueInLocalState} getImageTags={this.getImageTags} />
     }

    if (!this.props.isAdminState && this.props.gamePhase === 0) {
      //player phase 0
      playerInstructions = <PlayerInstructions />
     }

     if (this.props.isAdminState && this.props.gamePhase === 1) {
       //admin phase 1
      timer = <Timer/>
      }

      if (!this.props.isAdminState && this.props.gamePhase === 1) {
        //player phase 1
        tags = this.displayTags()
        uploadPic = <UploadPic inputValue={this.state.inputValue} changeInputValue={this.changeInputValueInLocalState} getImageTags={this.getImageTags} />
        timer = <Timer/>
      }

    if (this.props.gamePhase === 2) {
      //phase 2
      tags = this.displayTags()
      images = this.displayImages()
    }

    if (this.props.gamePhase === 3) {
      //phase 3 
      winningImage = this.winningImage()
    }

    return (
      <div>
        {adminInstructions}
        {playerInstructions}
        {uploadPic}
        {timer}
        {tags}
        {images}
        {winningImage}
        <SocketPage isAdmin={this.props.isAdmin}/>
      </div>
    )
  }

}


export default GameBestTags;