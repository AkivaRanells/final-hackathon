import React from "react";
import io from "socket.io-client";
//todo setup functions for image and tags broadcast
class SocketPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sentUrl: false,
            tagsEmit: false,
            firstTimeEmit: false,
            firstTime: false,
            isAdmin: false,
            startTimer: 0,
            timerStatus: false,
            message: '',
            messages: [],
        };

        this.socket = io('localhost:8080');

        this.socket.on('chat message', (msg) => {
            this.addMessage(msg);
        });

        this.socket.on('sendTags', (tags) => {
            if (!this.state.tagsEmit) {
                // console.log(tags.tags)
                this.props.changeTagsInState(tags.tags)
                // console.log(this.props.changeTagsInState(tags.tags))
                this.setState({ tagsEmit: true })
                this.props.changeGamePhase(1);
            }
        });

        this.socket.on("sendURL", (urlArray)=> {
            this.setState({sentUrl:true});
            this.props.changeImageURLSInState(urlArray)
            console.log(urlArray)
        })

        this.socket.on("userCounter", (userCounter) => {
            this.isAdmin(userCounter);
            if (userCounter === 1) {
                this.setState({ isAdmin: true, firstTime: true });
            }
        })

        this.socket.on("gameBegan", (time) => {
            if (!this.state.firstTimeEmit) {
                this.setState({ firstTimeEmit: true })

                // console.log('game has begun' + time.startTime + "timerStatus" + time.timerStatus);
                this.setState({ startTimer: time.startTime, timerStatus: time.timerStatus },
                    function () { this.timerFunction() })
            }
        })

        // this.socket.on('timer', (timer) => {

        //     if (!this.state.isAdmin) {

        //         this.setState({ timerStatus: timer.timerStatus, startTimer: timer.startTime, firstTime: false },
        //             function () {
        //                 // console.log('timer function called',this.state.timerStatus ,this.state.startTimer, timer.startTime );
        //                 this.timerFunction();
        //             });
        //     }
        // });

    }

    componentDidUpdate = () => {
        // console.log('componentdidupdate');
        // console.log(this.state.isAdmin)
        if (this.state.isAdmin && this.props.gameBegan && this.state.firstTime) {
            // console.log('componentDidUpdate admin' + this.state.isAdmin)
            this.socket.emit('gameBegan', { startTime: Date.now(), admin: this.state.isAdmin })
        }
        if (this.props.tags && !this.state.tagsEmit) {
            // console.log(this.props.tags)
            let tagObject = { tags: this.props.tags }
            
            
            this.socket.emit("sendTags", tagObject)
            
        }
        console.log(this.props.imageURL, this.state.sentUrl);
        if(!this.state.isAdmin){
            let url = this.props.imageURL;
            console.log(url);
            this.socket.emit("sendURL", url);
        }
    }

    timerFunction = () => {
        let secondsForCountdown = Math.round((this.state.startTimer + 60000 - Date.now()) / 1000);

        // console.log(secondsForCountdown)
        const interval = setInterval(() => {
            secondsForCountdown = secondsForCountdown - 1;
            // console.log(secondsForCountdown,this.state.startTimer)
            if (secondsForCountdown <= 0) {
                // console.log('conditionWorking')
                // console.log("Kill timer")
                this.setState({ timerStatus: false })
                this.props.changeGamePhase(2);
                clearInterval(interval);
            } else {
                this.setState({ seconds: secondsForCountdown })
            }
        }, 1000)

    }

    sendMessage = () => {
        // console.log("sending")
        this.socket.emit('chat message', {
            message: this.state.message,
            username: this.socket.id
        })
        this.setState({ message: '' });
    }

    addMessage = (msg) => {
        // console.log('receiving');
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



