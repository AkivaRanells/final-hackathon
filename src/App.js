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
import { observer, inject } from 'mobx-react';

@inject("store")
@observer
class App extends Component {

  logOut = () => {
    console.log('homepage')
    this.props.logOut()
  }

  render() {
    let to = this.props.userFound ? "/homepage" : "/login";
    return (
      <Router>

        <div className="App">
          <div className="header">
            <div className="headerLeft"></div>
            <div className="headerMid">
              <NavBar logOut={this.logOut} />

              <Route path="/" exact
                render={() =>
                  <Redirect to={to} />} />
              <Route path="/login" exact
                render={() =>
                  <Login
                    showError={this.props.showError}
                    checkDatabaseForNameEntered={this.props.checkDatabaseForNameEntered}
                    addEnteredNameIntoDatabase={this.props.addEnteredNameIntoDatabase}
                    redirectTo={this.props.redirectTo}
                  />}
              />
              <Route path="/homepage" exact
                render={() =>
                  <Homepage logOut={this.logOut} />}
              />
            </div>
            <div className="headerRight"></div>
          </div>
          <Route path="/game" exact
            render={() =>
              <GameBestTags
                getImageTags={this.getImageTags}
                isAdmin={this.isAdmin}
                gamePhase={this.state.gamePhase}
                isAdminState={this.state.isAdmin}
                changeGamePhase={this.changeGamePhase}
              />}
          />
        </div>
      </Router>
    );
  }
}

export default App;
