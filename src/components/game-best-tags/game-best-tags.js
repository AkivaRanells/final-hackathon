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
      imageURLs: [
        {url: "https://www.rspcansw.org.au/wp-content/uploads/2017/08/50_a-feature_dogs-and-puppies_mobile.jpg", votes: 0},
        {url: "https://www.cesarsway.com/sites/newcesarsway/files/styles/large_article_preview/public/Common-dog-behaviors-explained.jpg?itok=FSzwbBoi", votes: 0},
        {url: "https://images.theconversation.com/files/205966/original/file-20180212-58348-7huv6f.jpeg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip", votes: 0},
        {url: "https://i2-prod.mirror.co.uk/incoming/article9769854.ece/ALTERNATES/s615/PROD-Mixed-breed-lab-cross-8-week-old-puppy-in-farm-yard-near-Cochrane-AlbertajpgED.jpg", votes: 0},
        {url: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA5Ny84OTEvb3JpZ2luYWwvd2h5LWRvZ3MtZWF0LXBvb3A=", votes: 0},
        {url: "https://www.mensjournal.com/wp-content/uploads/gettyimages-583596559-e274095b-2e49-481a-b1d1-de6bfee9e588.jpg", votes: 0}
      ],
      haveSentURL: false,
      numberOfVotes: 0
    }
  }

  // ["dog", "canine", "mammal", "pet", "wolf", "cute"]

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

  getImageTags = () => {
    if (this.state.inputValue !== "") {
      // this.changeImageURLSInState(this.state.inputValue)
      if (this.props.isAdminState) {
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

addVote = (url) => {
  let newState = {...this.state}
  let votedImage = newState.imageURLs.find(image => {
    if (image.url === url) {
      image.votes = image.votes + 1
    } 
  });
  newState.numberOfVotes = newState.numberOfVotes + 1;
  this.setState(newState)
  if (this.state.numberOfVotes === 4) {
    this.props.changeGamePhase(3)
  }
}

  displayImages = () => {
    if (this.state.imageTags) {
      return this.state.imageURLs.map(image => {
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
    for (let i = 0; i < this.state.imageURLs.length; i++) {
      if (this.state.imageURLs[i].votes > winningImage.votes) {
        winningImage.votes = this.state.imageURLs[i].votes
        winningImage.imageURL = this.state.imageURLs[i].url
      }
    }
    return <div>
    <h1>Here's the winning image:</h1>
      <img src={winningImage.imageURL}></img>
    </div>
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
          imageURL={this.state.inputValue}
          urlArray={this.state.imageURLs}
        />
      </div>
    )
  }

}


export default GameBestTags;