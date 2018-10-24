import React from "react";
import io from "socket.io-client";
//todo setup functions for image and tags broadcast
class SocketPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            message: '',
            messages: []
        };

        this.socket = io('localhost:8080');

        this.socket.on('chat message', function (data) {
            this.addMessage(data);
        });

        this.addMessage = () => {
            console.log();
            //send it to the server
            this.socket.emit('chat message', {
                message: this.state.message
            })
            this.setState({ messages: [...this.state.messages, {username:this.socket.id,message: this.state.message}] },function(){console.log(this.state.messages);});
            
        };

        // this.sendMessage = () => {
        //     console.log("sending")
        //     this.socket.emit('chat message', {
        //         message: this.state.message
        //     })
        //     this.setState({ message: '' });
        // }
    }
    changeMessageInLocalState =(e)=>{
        // console.log(e.target.value)
        this.setState({message: e.target.value})
    }
    render() {
        return (
            <div>

                SocketPage
                {this.state.messages.map(message => {
                    return (
                        <div>{message.username}: {message.message}</div>
                    )
                })}
                <input type="text" value={this.state.name} onChange={this.changeMessageInLocalState}/>
                <button onClick={this.addMessage}>Send</button>
            </div>
        );
    }
}

export default SocketPage;