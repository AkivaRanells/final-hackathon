import React from "react";
import io from "socket.io-client";
//todo setup functions for image and tags broadcast
class SocketPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            status:
            timer: 60,
            username: '',
            message: '',
            messages: []
        };


        this.socket = io('localhost:8080');

        this.socket.on('chat message', (msg)=> {
            this.addMessage(msg);
        });

        this.socket.on('timer',  (status) =>{
            console.log(status);
             this.setState({timer:seconds})
        });





 
    }

    sendMessage = () => {
        console.log("sending")
        this.socket.emit('chat message', {
            message: this.state.message
        })
        this.setState({ message: '' });
    }

    addMessage = (msg) => {
        // console.log(this.socket.id);
        //send it to the server
        // this.socket.emit('chat message', {
        //     message: this.state.message
        // })
        this.setState({ messages: [...this.state.messages, {username: this.socket.id, message: msg}] },function(){console.log(this.state.messages);});
        
    };

    changeMessageInLocalState =(e)=>{
        // console.log(e.target.value)
        this.setState({message: e.target.value})
    }
    render() {
        return (
            <div>
                <p>SocketPage</p>
                <div>{this.state.timer}</div>
                
                {this.state.messages.map(message => {
                    return (
                        <div>{message.username}: {message.message}</div>
                    )
                })}
                <input type="text" value={this.state.name} onChange={this.changeMessageInLocalState}/>
                <button onClick={this.sendMessage}>Send</button>
            </div>
        );
    }
}

export default SocketPage;