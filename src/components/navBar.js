import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class NavBar extends Component {

  render() {
    return (
      <div id="navBar">
      <NavLink to="/HomePage" activeClassName="selectedTab">Homepage</NavLink>
      <NavLink to="/game" activeClassName="selectedTab">Play Best Tags!</NavLink>
      <NavLink to="/logout" activeClassName="selectedTab">logout</NavLink>
      </div> 
    )
  }

}


export default NavBar;