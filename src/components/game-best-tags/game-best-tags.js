import React, { Component } from 'react';
import NavBar from '../navBar';
import UploadPic from "./UploadPic";
import SocketPage from './SocketPage';
import AdminInstructions from './adminInstructions';
import PlayerInstructions from './playerInstructions';
import Timer from './timer';
import Images from './images';
import '../../styles/game-best-tags.css';



class GameBestTags extends Component {
  constructor() {
    super();
    this.state = {
      gameBegan: false,
      inputValue: "",
      gameActive: true,
      imageTags: ["demo", "tags", "that", "need", "to", "be", "deleted"],
      imageURLs: ['https://thumbs.dreamstime.com/z/cat-dog-party-hat-white-background-17900775.jpg','http://v892w2ylk4g429cyct840kvh-wpengine.netdna-ssl.com/wp-content/uploads/2012/05/AdobeStock_50013661-2.jpeg', 'https://i.ytimg.com/vi/EeIgc-5-JkY/maxresdefault.jpg', 'https://www.petmd.com/sites/default/files/introduce-dog-to-cat.jpg' ]
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
  startTimerInSocket=()=>{
    this.setState({gameBegan:true, startTime:Date.now()})
  }
  getImageTags = () => {
    this.startTimerInSocket();
    this.props.changeGamePhase(1);
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
        <div className="tags"> {tag} <div className="tags"> /</div></div>
      )
    }
  }

  displayImages = () => {
    if (this.state.imageTags !== "" || this.state.imageTags !== null) {
      return this.state.imageURLs.slice(0, 15).map(image =>
        <span><img src={image} className="gameImage"></img> </span>
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
        <div className="gameBox">{timer}
        {tags}
        <div>
        {images}
        </div>
        {winningImage}
        </div>
        <SocketPage isAdmin={this.props.isAdmin} 
        changeGamePhase={this.props.changeGamePhase}
        gameBegan={this.state.gameBegan}
        />
      </div>
    )
  }

}


export default GameBestTags;