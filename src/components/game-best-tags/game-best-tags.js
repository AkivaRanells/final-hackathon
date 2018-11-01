import React, { Component } from 'react';
import NavBar from '../navBar';
import UploadPic from "./UploadPic";
import SocketPage from './SocketPage';
import AdminInstructions from './adminInstructions';
import PlayerInstructions from './playerInstructions';
import Timer from './timer';
import Images from './images';
import '../../styles/game-best-tags.css';
import { observer, inject } from 'mobx-react';

@inject("store")
@observer
class GameBestTags extends Component {

  displayTags = () => {
    if (this.props.imageTags) {
      return this.props.imageTags.map(tag => {
        return (
          <div className="tags">
             / {tag} /
          </div>)
      }
      )
    }
  }

  displayImages = () => {
    if (this.props.imageTags) {
      return this.props.imageURLs.map(image => {
        return (
          <span onClick={() => this.addVote(image.url)}><img src={image.url} className="gameImage"></img> </span>
        )
      })
    }
  }

  winningImage = () => {
    let winningImage = {
      votes: 0,
      imageURL: ""
    }
    for (let i = 0; i < this.props.imageURLs.length; i++) {
      if (this.props.imageURLs[i].votes > winningImage.votes) {
        winningImage.votes = this.props.imageURLs[i].votes
        winningImage.imageURL = this.props.imageURLs[i].url
      }
    }
    return <div>
      <h1>Here's the winning image:</h1>
      <img src={winningImage.imageURL}></img>
    </div>
  }



  render() {
    let adminInstructions = null;
    let playerInstructions = null;
    let uploadPic = null;
    let timer = null;
    let tags = null;
    let images = null;
    let winningImage = null;

    if (this.props.isAdmin && this.props.gamePhase === 0) {
      //admin phase 0
      adminInstructions = <AdminInstructions />
      uploadPic = <UploadPic inputValue={this.state.inputValue} changeInputValue={this.props.changeInputValue} getImageTags={this.props.getImageTags} />
    }

    if (!this.props.isAdmin && this.props.gamePhase === 0) {
      //player phase 0
      playerInstructions = <PlayerInstructions />
    }

    if (this.props.isAdmin && this.props.gamePhase === 1) {
      //admin phase 1
      tags = this.displayTags()
      timer = <Timer />
    }

    if (!this.props.isAdmin && this.props.gamePhase === 1) {
      //player phase 1
      tags = this.displayTags()
      uploadPic = <UploadPic inputValue={this.props.inputValue} changeInputValue={this.props.changeInputValue} getImageTags={this.props.getImageTags} />
      timer = <Timer />
    }

    if (this.props.gamePhase === 2) {
      //phase 2
      // console.log("gamePhase2")
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
        <div className="gameBox">
          {tags}
          {timer}
          <div></div>
          {images}
          {winningImage}
        </div>
        <div >
        </div>

        <SocketPage isAdmin={this.props.isAdminFunction}
          changeGamePhase={this.props.changeGamePhase}
          gameBegan={this.props.gameBegan}
          tags={this.props.imageTags}
          changeTagsInState={this.props.changeTagsInState}
          changeImageURLSInState={this.props.changeImageURLSInState}
          imageURL={this.props.inputValue}
          urlArray={this.props.imageURLs}
        />
      </div >
    )
  }

}


export default GameBestTags;