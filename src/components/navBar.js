import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/NavBar.css'

class NavBar extends Component {

  logOut = () => {
    this.props.logOut()
    //change state of user.userfound to false in App
  }
  render() {
    return (
      <div>
        <h1>Welcome to Best Tags Game!</h1>
        <div id="navBar">
          <NavLink to="/HomePage" activeClassName="selectedTab" className="head-tab">Homepage</NavLink>
          <NavLink to="/login" activeClassName="selectedTab" className="head-tab" onClick={this.logOut}>logout</NavLink>
        </div>
        
      </div>
    )
  }

}


export default NavBar;