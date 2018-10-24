import React, { Component } from 'react';
import NavBar from '../navBar';

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

  render() {
    return (
      <div>
        <NavBar />
        <input type="text" value={this.state.inputValue} onChange={this.changeInputValueInLocalState}/>
        <button onClick={this.getImageTags}>Get Tags!</button>
      </div> 
    )
  }

}


export default GameBestTags;