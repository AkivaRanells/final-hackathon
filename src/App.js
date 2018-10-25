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


class App extends Component {
  constructor() {
    super();
    this.state = {
      userFound: false,
      currentUser: {},
      showError: false,
      redirectTo: null,
      isAdmin: true,
      gamePhase: 0
    }
  }

  getImageTags(str) {
    return Axios.get('http://localhost:8080/image', {
      params: {
        str: str
      }
    })
      .then((response) => {
        console.log(response.data.concepts);
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  checkDatabaseForNameEntered = async (str) => {
    if (str === "") {
      alert("Please enter a name!")
    } else {
      let data = await Axios.get(`http://localhost:8080/users/${str}`)
      if (data.data[0]) {
        this.setState({
          currentUser: data.data[0],
          userFound: true,
          redirectTo: "/homepage"
        })
      } else {
        this.setState({
          showError: true
        })
      }
      console.log(this.state)
    }
  }

  addEnteredNameIntoDatabase = async (str) => {
    let data = await Axios.get(`http://localhost:8080/users/${str}`)
    if (data.data[0]) {
      console.log(data.data[0])
      this.setState({
        currentUser: data.data[0],
        userFound: true,
        redirectTo: "/homepage"
      })
    } else {
      let newUser = {
        userName: str,
        bestTagsTotalScoreHistory: 0,
        tags: []
      }
      Axios.post('http://localhost:8080/users', newUser)
        .then((data) => {
          console.log("added")
          this.setState({
            currentUser: newUser,
            userFound: true,
            redirectTo: "/homepage"
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }


  logOut = () => {
    this.setState({ userFound: false })
  }

  isAdmin = (value) => {
    if (value === 1) {
      this.setState({
        isAdmin: true
      })
    }
  }

  render() {
    let to = this.state.userFound ? "/homepage" : "/login";
    return (
      <Router>
        <div className="App">
          <Route path="/" exact
            render={() =>
              <Redirect to={to} />} />
          {/* <Route path="/" exact
            render={() =>
              <Redirect to="/login" />}
          /> */}
          {/* <Route path="/" exact
            render={() =>
              ((this.state.userFound) ? (
                <Redirect to="/homepage" />
              ) :
                <Redirect to="/login" />
              )
            }
          /> */}
          <Route path="/login" exact
            render={() =>
              <Login
                showError={this.state.showError}
                checkDatabaseForNameEntered={this.checkDatabaseForNameEntered}
                addEnteredNameIntoDatabase={this.addEnteredNameIntoDatabase}
                redirectTo={this.state.redirectTo}
              />}
          />
          <Route path="/homepage" exact
            render={() =>
              <Homepage logOut={this.logOut} />}
          />
          <Route path="/game" exact
            render={() =>
              <GameBestTags
                getImageTags={this.getImageTags}
                isAdmin={this.isAdmin}
                gamePhase={this.state.gamePhase}
                isAdminState={this.state.isAdmin}
              />}
          />
        </div>
      </Router>
    );
  }
}

export default App;
