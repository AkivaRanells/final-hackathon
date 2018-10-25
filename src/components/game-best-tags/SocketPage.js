import React from "react";
import io from "socket.io-client";
//todo setup functions for image and tags broadcast
class SocketPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAdmin: false,
            timerStatus: false,
            seconds: 60,
            message: '',
            messages: []
        };

        this.socket = io('localhost:8080');

        this.socket.on('chat message', (msg)=> {
            this.addMessage(msg);
        });


        this.socket.on("userCounter", (userCounter) => {
            if(userCounter===1){
                this.setState({isAdmin:true})
            }
        })


        this.socket.on('timer', (timerStatus) => {
            console.log(timerStatus);
            this.setState({ timerStatus: timerStatus });
            this.timerFunction();
        });
 
    }

    timerFunction = () => {
        let secondsForCountdown = 60;
        const interval = setInterval(() => {
            secondsForCountdown--;
            if(secondsForCountdown===0){return this.setState({timerStatus:false})}
            this.setState({ seconds: secondsForCountdown })
        }, 1000)

    }

    sendMessage = () => {
        console.log("sending")
        this.socket.emit('chat message', {
            message: this.state.message,
            username: this.socket.id
        })
        this.setState({ message: '' });
    }

    addMessage = (msg) => {
        console.log('receiving');
        //send it to the server
        // this.socket.emit('chat message', {
        //     message: this.state.message
        // })
        this.setState({ messages: [...this.state.messages, {username: msg.username, message: msg.message }] },function(){console.log(this.state.messages);});
        
    };

    changeMessageInLocalState =(e)=>{
        // console.log(e.target.value)
        this.setState({message: e.target.value})
    }
    render() {
        return (
            <div>
                <p>SocketPage</p>
                <div>{this.state.timerStatus ? <p>{this.state.seconds}</p> : <p>Out of Time</p>}</div>
                {this.state.messages.map(message => {
                    return (
                        <div>{message.username} : {message.message}</div>
                    )
                })}
                <input type="text" value={this.state.name} onChange={this.changeMessageInLocalState}/>
                <button onClick={this.sendMessage}>Send</button>
            </div>
        );
    }
}

export default SocketPage



