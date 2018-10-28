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
      gameBegan: false,
      inputValue: "",
      gameActive: true,
      imageTags: [],
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
  startTimerInSocket = () => {
    this.setState({ gameBegan: true, startTime: Date.now() })
  }

  getImageTags = () => {
    if (this.state.inputValue !== "") {
      this.props.getImageTags(this.state.inputValue)
        .then((response) => {
          let tags = response.data.concepts.map(tag => tag.name)
          console.log('Got tags')
          this.setState({ imageTags: tags })
          this.startTimerInSocket();
          this.props.changeGamePhase(1);
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

  changeTagsInState = (tags) => {
    // console.log(tags)
    this.setState({
      imageTags: tags
    })
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
      tags = this.displayTags()
      timer = <Timer />
    }

    if (!this.props.isAdminState && this.props.gamePhase === 1) {
      //player phase 1
      tags = this.displayTags()
      uploadPic = <UploadPic inputValue={this.state.inputValue} changeInputValue={this.changeInputValueInLocalState} getImageTags={this.getImageTags} />
      timer = <Timer />
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
        <div className="tags">{timer}
          {tags}
          {images}
          {winningImage}
        </div>
        <SocketPage isAdmin={this.props.isAdmin}
          changeGamePhase={this.props.changeGamePhase}
          gameBegan={this.state.gameBegan}
          tags={this.state.imageTags}
          changeTagsInState={this.changeTagsInState}
        />
      </div>
    )
  }

}


export default GameBestTags;