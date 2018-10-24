import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/NavBar.css'

class NavBar extends Component {

  render() {
    return (
      <div>
        <h1>Welcome to Best Tags Game!</h1>
        <div id="navBar">
          <NavLink to="/HomePage" activeClassName="selectedTab" className="head-tab">Homepage</NavLink>
          <NavLink to="/login" activeClassName="selectedTab" className="head-tab">logout</NavLink>
        </div>
        
      </div>
    )
  }

}


export default NavBar;