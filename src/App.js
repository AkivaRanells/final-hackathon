import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import './App.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import NavBar from "./components/navBar";
import Homepage from './components/homepage/homepage';
import GameBestTags from './components/game-best-tags/game-best-tags';
import Login from './components/login';
import Axios from 'axios';

import { createHashHistory } from 'history'

const history = createHashHistory()

class App extends Component {
  constructor() {
    super();
    this.state = {
      userFound: false,
      users: []
    }
  }

  componentDidMount = () => {
    this.getData();
  }

  getData() {
    Axios.get('http://localhost:8080/users')
      .then((response) => {
        console.log(response);
        let newState = { ...this.state };
        newState.users = response.data;
        console.log(newState.users);
        this.setState(newState);  
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getImageTags(str) {
    Axios.get('http://localhost:8080/image', {
      params: {
        str:str
      }
    })
    .then((response) => {
      console.log(response.data.concepts);
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  checkDatabaseForNameEntered = (str) => {
    for (let i = 0; i < this.state.users.length; i ++) {
      if (str === this.state.users[i].userName) {
        let newState = {...this.state};
        newState.userFound = true;
        this.setState(newState);
      }
    }
    if(!this.state.userFound) { alert("I couldn't find you, try registering instead!")};
  }

  addEnteredNameIntoDatabase = (str) => {
    let newUser = {
      userName: str,
      bestTagsTotalScoreHistory: 0,
        tags: []
    }
    for (let i = 0; i < this.state.users.length; i ++) {
      if (str === this.state.users[i].userName) {
        let newState = {...this.state};
        newState.userFound = true;
        this.setState(newState);
      }
    }
    if (!this.state.userFound) {
    Axios.post('http://localhost:8080/users', newUser)
    .then((data)=>{
      let newState = {...this.state};
      newState.userFound = true;
      this.setState(newState);
    })
    .catch((err)=>{
      console.log(err)
    })
  } else {
    alert("You are already registered!");
  }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" exact
            render={() =>
              ((this.state.userFound) ? (
                <Redirect to="/homepage" />
              ) :
                <Redirect to="/login" />
              )
            }
          />
          <Route path="/login" exact
            render={() =>
              <Login 
              checkDatabaseForNameEntered={this.checkDatabaseForNameEntered}
              addEnteredNameIntoDatabase={this.addEnteredNameIntoDatabase}
              />}
          />
          <Route path="/homepage" exact
            render={() =>
              <Homepage />}
          />
          <Route path="/game" exact
            render={() =>
              <GameBestTags 
              getImageTags={this.getImageTags}
              />}
          />
        </div>
      </Router>
    );
  }
}

export default App;
