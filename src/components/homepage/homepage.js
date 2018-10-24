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
        <NavBar logOut={this.logOut} />
        <div className="homepage" >
          <Link to="/game" activeClassName="selectedTab" ><input type="button" className="button" value="Let's Play!" /></Link>
          {/* <Link to="/game" activeClassName="selectedTab"><input type="button" className="button" value="Join an existing game!"/></Link>  */}
        </div>

        <SocketPage />
      </div>
    )
  }

}


export default Homepage;