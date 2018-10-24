import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar'
import '../../styles/homepage.css';
import SocketPage from './SocketPage'


class Homepage extends Component {

  render() {
    return (
      <div>
        <NavBar />
        <div className="homepage" >
          <button type="button" className="button" render={<Link to="/game" activeClassName="selectedTab" />}>Host a new Game</button>
          <button type="button" className="button" render={<Link to="/game" activeClassName="selectedTab" />}> Join an existing game!</button>
        </div>
        <SocketPage />
      </div>
    )
  }

}


export default Homepage;