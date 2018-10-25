import React, { Component } from 'react';
import NavBar from '../navBar';
import UploadPic from "./UploadPic";
import SocketPage from './SocketPage';
import AdminInstructions from './adminInstructions'
import PlayerInstructions from './playerInstructions'



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
        if (this.props.isAdminState && this.props.gamePhase === 0) {
          adminInstructions = <AdminInstructions/>
          playerInstructions = <PlayerInstructions/>
        }
    return (
      <div>
        {adminInstructions}    
        {playerInstructions}    
        {/* <NavBar /> */}

        {/* <div className="game-container">
          {this.checkForActiveGame()}
          {this.displayTags()}
          <SocketPage 
          isAdmin={this.props.isAdmin}
          />
 */}


        {/* </div> */}
      </div>
    )
  }

}


export default GameBestTags;