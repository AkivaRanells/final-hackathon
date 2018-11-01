import React, { Component } from 'react';
import {Link, Redirect} from "react-router-dom";
import { action, observable } from 'mobx';
import { observer, inject } from 'mobx-react';
@inject('store')
@observer
class Login extends Component {
  @observable name = ''
  constructor() {
    super();
    this.state = {
      name: ""
    }
  }

  @action changeNameInLocalState = (event) => {
      this.name = event.target.value;
  }

  checkDatabaseForNameEntered = () => {
    this.props.store.checkDatabaseForNameEntered(this.name);
  }

  addEnteredNameIntoDatabase = () => {
    if (this.name !=="") {
    this.props.store.addEnteredNameIntoDatabase(this.name);
    } else {
      alert("you can't register without a username!");  
    }
  }

  render() {
    if(this.props.store.redirectTo) {
      return <Redirect to={this.props.store.redirectTo} />
    } 
    return (
      <div>
        <input type="text" value={this.name} onChange={this.changeNameInLocalState}/>
        <Link to="/"><button onClick={this.checkDatabaseForNameEntered}>Login</button></Link>
        <Link to="/"><button onClick={this.addEnteredNameIntoDatabase}>Register</button></Link>
        { this.props.store.showError
        ? <p>USER NOT FOUND!</p>
        : <p></p>
      } 
      </div> 
    )
  }

}


export default Login;