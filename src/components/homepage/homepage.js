import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar'
import '../../styles/homepage.css';
import SocketPage from './SocketPage'


class Homepage extends Component {

  logOut = () => {
    console.log('homepage')
    this.props.logOut()
  }

  render() {
    return (
      <div>
        <NavBar logOut={this.logOut}/>
        <div className="homepage" >
          <input type="button" className="button" value="Host a new Game" render={<Link to="/game" activeClassName="selectedTab" />}></input>
          <input type="button" className="button" value="Join an existing game!" render={<Link to="/newgame" activeClassName="selectedTab" />}/>
        </div>
        <SocketPage />
      </div>
    )
  }

}


export default Homepage;