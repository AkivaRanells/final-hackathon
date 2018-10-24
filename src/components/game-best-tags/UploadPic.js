import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class UploadPic extends Component {

  

  render() {
    return (
        <div>
            <form id="upload-pic">
            <input type="url" placeholder="Enter image link here"/>
            </form>
            <button type="submit" form="upload-pic" onclick={this.up}>Upload</button>
            </div>
    )
    
    
  }

}


export default UploadPic;