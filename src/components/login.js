import React, { Component } from 'react';
import {Link} from "react-router-dom";

class Login extends Component {

  constructor() {
    super();
    this.state = {
      name: ""
    }
  }

  changeNameInLocalState = (event) => {
    let newState = {...this.state};
    newState.name = event.target.value;
    this.setState(newState);
  }

  checkDatabaseForNameEntered = () => {
    this.props.checkDatabaseForNameEntered(this.state.name);
  }

  addEnteredNameIntoDatabase = () => {
    if (this.state.name !=="") {
    this.props.addEnteredNameIntoDatabase(this.state.name);
    } else {
      alert("you can't register without a username!");  
    }
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.name} onChange={this.changeNameInLocalState}/>
        <Link to="/"><button onClick={this.checkDatabaseForNameEntered}>Login</button></Link>
        <Link to="/"><button onClick={this.addEnteredNameIntoDatabase}>Register</button></Link>
      </div> 
    )
  }

}


export default Login;