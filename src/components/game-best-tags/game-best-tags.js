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
      imageTags: null,
      imageURLs: [],
      imageURL: "",
      haveSentURL: false
    }
  }

  checkForActiveGame = () => {
    if (this.state.gameActive) {
      // console.log("1")
    }
    else {
      return <UploadPic inputValue={this.state.inputValue} changeInputValue={this.changeInputValueInLocalState} getImageTags={this.getImageTags} />
    };
  }
  startTimerInSocket = () => {
    this.setState({ gameBegan: true, startTime: Date.now() })
  }

  changeURLInState=()=>{
    let url =this.state.inputValue;
    this.setState({imageURL: url}, function(){console.log(this.state.imageURL)})
  }
  getImageTags = () => {
    if (this.state.inputValue !== "") {
      this.changeURLInState();
      // this.changeImageURLSInState(this.state.inputValue)
      if (this.props.isAdminState) {
        console.log("is admin")
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
      }
    }
  }

  displayTags = () => {
    if (this.state.imageTags) {
      return this.state.imageTags.map(tag => {
        return (
          <div className="tags">
            --{tag}-- <div className="tags">
            </div>
          </div>)
      }
      )
    }
    // .slice(0, 15)
  }

  displayImages = () => {
    if (this.state.imageTags) {
      return this.state.imageURLs.map(image => {
        return (
          <span><img src={image} className="gameImage"></img> </span>
        )
      })
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
    this.setState({
      imageTags: tags
    })
  }

  changeImageURLSInState = (urlArray) => {
    if(!this.state.haveSentURL) {
    this.setState({imageURLs:urlArray, haveSentURL:true}, function(){
      console.log(this.state.imageURLs)
    }
    )
  }
  }

  // componentDidUpdate() {
  //   this.displayTags()
  // }

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
          tags={this.state.imageTags}
          changeTagsInState={this.changeTagsInState}
          changeImageURLSInState={this.changeImageURLSInState}
          imageURL={this.state.imageURL}
          urlArray={this.state.imageURLs}
        />
      </div>
    )
  }

}


export default GameBestTags;