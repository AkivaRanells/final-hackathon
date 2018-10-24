import React, { Component } from 'react';
import NavBar from '../navBar';
import SocketPage from './SocketPage'
class Homepage extends Component {

  render() {
    return (
      <div>
        <NavBar />
        homepage
        <SocketPage/>
      </div> 
    )
  }

}


export default Homepage;