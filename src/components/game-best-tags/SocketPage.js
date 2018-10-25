import React from "react";
import io from "socket.io-client";
//todo setup functions for image and tags broadcast
class SocketPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startTimer: 0,
            timerStatus: false,
            seconds: 60,
            message: '',
            messages: []
        };

        this.socket = io('localhost:8080');

        this.socket.on('chat message', (msg) => {
            this.addMessage(msg);
        });


        this.socket.on("userCounter", (userCounter) => {
            this.isAdmin(userCounter);
            this.setState({ isAdmin: true })
        })

        this.socket.on("startTime", (startTime) => {
            console.log(startTime);
            this.setState({ startTimer: startTime })
        })

        this.socket.on('timer', (timerStatus) => {
            console.log(timerStatus);
            if (this.state.isAdmin) { }
            this.setState({ timerStatus: timerStatus });
            this.timerFunction();
        });

    }

    timerFunction = () => {
        let secondsForCountdown = this.state.startTimer + 60000;
        const interval = setInterval(() => {
            secondsForCountdown -= 1000;
            if (secondsForCountdown === this.state.startTimer) {
                return this.setState({ timerStatus: false })
            } else {
                this.setState({ seconds: secondsForCountdown })
            }
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
        this.setState({ messages: [...this.state.messages, { username: msg.username, message: msg.message }] }, function () { console.log(this.state.messages); });

    };

    isAdmin = (value) => {
        this.props.isAdmin(value)
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
                        <div>{message.username} : {message.message}</div>
                    )
                })}
                <input type="text" value={this.state.name} onChange={this.changeMessageInLocalState} />
                <button onClick={this.sendMessage}>Send</button>
            </div>
        );
    }
}

export default SocketPage



