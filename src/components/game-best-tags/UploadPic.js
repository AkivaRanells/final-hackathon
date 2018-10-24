import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class UploadPic extends Component {



    render() {
        return (
            <div>
                <input type="text" value={this.props.inputValue} onChange={this.props.changeInputValue} placeholder="Img link goes here" />
                <button onClick={this.props.getImageTags}>Get Tags!</button>
            </div>
        )


    }

}


export default UploadPic;