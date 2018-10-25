import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../navBar'
import '../../styles/homepage.css';



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

      </div>
    )
  }

}


export default Homepage;