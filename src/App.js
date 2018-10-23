import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import './App.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import NavBar from "./components/navBar";
import Homepage from './components/homepage/homepage';
import GameBestTags from './components/game-best-tags/game-best-tags';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
        <NavBar />
        <Route path="/" exact
            render={() =>
              <Redirect to="/Homepage" />}
          />
          <Route path="/Homepage" exact
            render={() =>
              <Homepage />}
          />
          <Route path="/game" exact
            render={() =>
              <GameBestTags />}
          />
        </div>
      </Router>
    );
  }
}

export default App;
