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
            username: '',
            message: '',
            messages: []
        };


        this.socket = io('localhost:8080');

        this.socket.on('chat message', function (data) {
            this.addMessage(data);
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





        // this.sendMessage = () => {
        //     console.log("sending")
        //     this.socket.emit('chat message', {
        //         message: this.state.message
        //     })
        //     this.setState({ message: '' });
        // }
    }

    addMessage = () => {
        // console.log(this.socket.id);
        //send it to the server
        this.socket.emit('chat message', {
            message: this.state.message
        })
        this.setState({ messages: [...this.state.messages, { username: this.socket.id, message: this.state.message }] }, function () { console.log(this.state.messages); });

    };

    timerFunction = () => {
        let secondsForCountdown = 60;
        const interval = setInterval(() => {
            secondsForCountdown--;
            if(secondsForCountdown===0){return this.setState({timerStatus:false})}
            this.setState({ seconds: secondsForCountdown })
        }, 1000)

    }

    changeMessageInLocalState = (e) => {
        // console.log(e.target.value)
        this.setState({ message: e.target.value })
    }
    render() {
        return (
            <div>
                <p>SocketPage</p>
                <div>{this.state.timerStatus ? <p>{this.state.seconds}</p> : <p>Out of Time</p>}</div>

                {this.state.messages.map(message => {
                    return (
                        <div>{message.username}: {message.message}</div>
                    )
                })}
                <input type="text" value={this.state.name} onChange={this.changeMessageInLocalState} />
                <button onClick={this.addMessage}>Send</button>
            </div>
        );
    }
}

export default SocketPage;