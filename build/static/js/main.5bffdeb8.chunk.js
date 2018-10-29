(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{102:function(e,t){},106:function(e,t,a){},126:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),i=a(49),r=a.n(i),o=(a(55),a(16)),c=a.n(o),l=a(29),u=a(2),m=a(3),g=a(5),h=a(4),p=a(6),d=a(132),f=a(127),b=a(128),v=(a(59),a(62),a(130)),E=(a(64),function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,s=new Array(n),i=0;i<n;i++)s[i]=arguments[i];return(a=Object(g.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(s)))).logOut=function(){a.props.logOut()},a}return Object(p.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement("h1",null,"Welcome to Best Tags Game!"),s.a.createElement("div",{id:"navBar"},s.a.createElement(v.a,{to:"/HomePage",activeClassName:"selectedTab",className:"head-tab"},"Homepage"),s.a.createElement(v.a,{to:"/login",activeClassName:"selectedTab",className:"head-tab",onClick:this.logOut},"logout")))}}]),t}(n.Component)),O=a(69),y=(a(72),function(e){function t(){return Object(u.a)(this,t),Object(g.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement("div",{className:"homepage"},s.a.createElement(O.a,{to:"/game",activeClassName:"selectedTab"},s.a.createElement("input",{type:"button",className:"button",value:"Let's Play!"}))))}}]),t}(n.Component)),S=a(15),j=function(e){function t(){return Object(u.a)(this,t),Object(g.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement("input",{type:"text",value:this.props.inputValue,onChange:this.props.changeInputValue,placeholder:"Img link goes here"}),s.a.createElement("button",{onClick:this.props.getImageTags},"Get Tags!"))}}]),t}(n.Component),T=a(71),w=a(70),I=a.n(w),k=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(g.a)(this,Object(h.a)(t).call(this,e))).componentDidUpdate=function(){if(a.state.isAdmin&&a.props.gameBegan&&a.state.firstTime&&a.socket.emit("gameBegan",{startTime:Date.now(),admin:a.state.isAdmin}),a.props.tags&&!a.state.tagsEmit){var e={tags:a.props.tags};a.socket.emit("sendTags",e)}if(console.log("componentDidUpdate"+JSON.stringify(a.props)),console.log("--------"),console.log(!a.state.isAdmin+"  -  "+a.state.sentUrl),!a.state.isAdmin&&a.state.sentUrl&&a.props.imageURL.length>0){var t=a.props.imageURL;console.log(a.props),a.socket.emit("sendURL",t)}},a.timerFunction=function(){var e=Math.round((a.state.startTimer+6e4-Date.now())/1e3),t=setInterval(function(){(e-=1)<=0?(a.setState({timerStatus:!1}),a.props.changeGamePhase(2),clearInterval(t)):a.setState({seconds:e})},1e3)},a.sendMessage=function(){a.socket.emit("chat message",{message:a.state.message,username:a.socket.id}),a.setState({message:""})},a.addMessage=function(e){a.setState({messages:Object(T.a)(a.state.messages).concat([{username:e.username,message:e.message}])},function(){console.log(this.state.messages)})},a.isAdmin=function(e){a.props.isAdmin(e)},a.changeMessageInLocalState=function(e){a.setState({message:e.target.value})},a.state={sentUrl:!0,tagsEmit:!1,firstTimeEmit:!1,firstTime:!1,isAdmin:!1,startTimer:0,timerStatus:!1,message:"",messages:[]},a.socket=I()("https://best-tags.herokuapp.com/game"),a.socket.on("chat message",function(e){a.addMessage(e)}),a.socket.on("sendTags",function(e){a.state.tagsEmit||(a.props.changeTagsInState(e.tags),a.setState({tagsEmit:!0}),a.props.changeGamePhase(1))}),a.socket.on("sendURL",function(e){a.setState({sentUrl:!1}),a.props.changeImageURLSInState(e),console.log(e)}),a.socket.on("userCounter",function(e){a.isAdmin(e),1===e&&a.setState({isAdmin:!0,firstTime:!0})}),a.socket.on("gameBegan",function(e){a.state.firstTimeEmit||(a.setState({firstTimeEmit:!0}),a.setState({startTimer:e.startTime,timerStatus:e.timerStatus},function(){this.timerFunction()}))}),a}return Object(p.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement("p",null,"SocketPage"),s.a.createElement("div",null,this.state.timerStatus?s.a.createElement("p",null,this.state.seconds):s.a.createElement("p",null,"Out of Time")),this.state.messages.map(function(e){return s.a.createElement("div",null,e.username," : ",e.message)}),s.a.createElement("input",{type:"text",value:this.state.name,onChange:this.changeMessageInLocalState}),s.a.createElement("button",{onClick:this.sendMessage},"Send"))}}]),t}(s.a.Component),N=(a(43),function(e){function t(){return Object(u.a)(this,t),Object(g.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement("h2",null,"Instructions!"),s.a.createElement("div",{className:"admin-instructions-1 instructions"},"This is your chance to create the game! All you have to do is find a picture online, and submit it."),s.a.createElement("div",{className:"admin-instructions-2 instructions"},"When you are done you'll wait while the other players are selecting pics according to the tags YOUR pic provided!"),s.a.createElement("div",{className:"admin-instructions-3 instructions"},"After all players submit their picture you will be shown all of the players submition, and choose the one you think is the best one!"),s.a.createElement("div",{className:"admin-instructions-4 instructions"},"After time is up (or all the players voted), the winner will be anounced!"))}}]),t}(n.Component)),A=function(e){function t(){return Object(u.a)(this,t),Object(g.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement("h2",null,"Player instructions!"),s.a.createElement("div",{className:"player-instructions-1 instructions"},"As you are reading this, one of the players is picking a picture for the game."),s.a.createElement("div",{className:"player-instructions-2 instructions"},"When he is done you'll see a collection of tags describing the selected pic. Your job is to submit for a picture that'll fit the most tags!"),s.a.createElement("div",{className:"player-instructions-3 instructions"},"After all players submit their picture you will be shown all of the players submition, and choose the one you think is the best one!"),s.a.createElement("div",{className:"player-instructions-4 instructions"},"After time is up (or all the players voted), the winner will be anounced!"))}}]),t}(n.Component),L=function(e){function t(){return Object(u.a)(this,t),Object(g.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return s.a.createElement("div",null,"timer!")}}]),t}(n.Component),U=(n.Component,a(106),function(e){function t(){var e;return Object(u.a)(this,t),(e=Object(g.a)(this,Object(h.a)(t).call(this))).checkForActiveGame=function(){if(!e.state.gameActive)return s.a.createElement(j,{inputValue:e.state.inputValue,changeInputValue:e.changeInputValueInLocalState,getImageTags:e.getImageTags})},e.startTimerInSocket=function(){e.setState({gameBegan:!0,startTime:Date.now()})},e.getImageTags=function(){""!==e.state.inputValue&&e.props.isAdminState&&e.props.getImageTags(e.state.inputValue).then(function(t){var a=t.data.concepts.map(function(e){return e.name});console.log("Got tags"),e.setState({imageTags:a}),e.startTimerInSocket(),e.props.changeGamePhase(1)}).catch(function(e){console.log(e)})},e.displayTags=function(){if(e.state.imageTags)return e.state.imageTags.map(function(e){return s.a.createElement("div",{className:"tags"},"/ ",e," /")})},e.addVote=function(t){var a=Object(S.a)({},e.state);a.imageURLs.find(function(e){e.url===t&&(e.votes=e.votes+1)});a.numberOfVotes=a.numberOfVotes+1,e.setState(a),4===e.state.numberOfVotes&&e.props.changeGamePhase(3)},e.displayImages=function(){if(e.state.imageTags)return e.state.imageURLs.map(function(t){return s.a.createElement("span",{onClick:function(){return e.addVote(t.url)}},s.a.createElement("img",{src:t.url,className:"gameImage"})," ")})},e.winningImage=function(){for(var t={votes:0,imageURL:""},a=0;a<e.state.imageURLs.length;a++)e.state.imageURLs[a].votes>t.votes&&(t.votes=e.state.imageURLs[a].votes,t.imageURL=e.state.imageURLs[a].url);return s.a.createElement("div",null,s.a.createElement("h1",null,"Here's the winning image:"),s.a.createElement("img",{src:t.imageURL}))},e.changeInputValueInLocalState=function(t){var a=Object(S.a)({},e.state);a.inputValue=t.target.value,e.setState(a)},e.isAdmin=function(t){e.props.isAdmin(t)},e.changeTagsInState=function(t){e.setState({imageTags:t})},e.changeImageURLSInState=function(t){e.state.haveSentURL||e.setState({imageURLs:t,haveSentURL:!0},function(){console.log(this.state.imageURLs)})},e.state={gameBegan:!1,inputValue:"",gameActive:!0,imageTags:null,imageURLs:[{url:"https://www.rspcansw.org.au/wp-content/uploads/2017/08/50_a-feature_dogs-and-puppies_mobile.jpg",votes:0},{url:"https://www.cesarsway.com/sites/newcesarsway/files/styles/large_article_preview/public/Common-dog-behaviors-explained.jpg?itok=FSzwbBoi",votes:0},{url:"https://images.theconversation.com/files/205966/original/file-20180212-58348-7huv6f.jpeg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip",votes:0},{url:"https://i2-prod.mirror.co.uk/incoming/article9769854.ece/ALTERNATES/s615/PROD-Mixed-breed-lab-cross-8-week-old-puppy-in-farm-yard-near-Cochrane-AlbertajpgED.jpg",votes:0},{url:"https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA5Ny84OTEvb3JpZ2luYWwvd2h5LWRvZ3MtZWF0LXBvb3A=",votes:0},{url:"https://www.mensjournal.com/wp-content/uploads/gettyimages-583596559-e274095b-2e49-481a-b1d1-de6bfee9e588.jpg",votes:0}],haveSentURL:!1,numberOfVotes:0},e}return Object(p.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=null,t=null,a=null,n=null,i=null,r=null,o=null;return this.props.isAdminState&&0===this.props.gamePhase&&(e=s.a.createElement(N,null),a=s.a.createElement(j,{inputValue:this.state.inputValue,changeInputValue:this.changeInputValueInLocalState,getImageTags:this.getImageTags})),this.props.isAdminState||0!==this.props.gamePhase||(t=s.a.createElement(A,null)),this.props.isAdminState&&1===this.props.gamePhase&&(i=this.displayTags(),n=s.a.createElement(L,null)),this.props.isAdminState||1!==this.props.gamePhase||(i=this.displayTags(),a=s.a.createElement(j,{inputValue:this.state.inputValue,changeInputValue:this.changeInputValueInLocalState,getImageTags:this.getImageTags}),n=s.a.createElement(L,null)),2===this.props.gamePhase&&(i=this.displayTags(),r=this.displayImages()),3===this.props.gamePhase&&(o=this.winningImage()),s.a.createElement("div",null,e,t,a,s.a.createElement("div",{className:"gameBox"},i,n,s.a.createElement("div",null),r,o),s.a.createElement("div",null),s.a.createElement(k,{isAdmin:this.props.isAdmin,changeGamePhase:this.props.changeGamePhase,gameBegan:this.state.gameBegan,tags:this.state.imageTags,changeTagsInState:this.changeTagsInState,changeImageURLSInState:this.changeImageURLSInState,imageURL:this.state.inputValue,urlArray:this.state.imageURLs}))}}]),t}(n.Component)),R=a(131),V=function(e){function t(){var e;return Object(u.a)(this,t),(e=Object(g.a)(this,Object(h.a)(t).call(this))).changeNameInLocalState=function(t){var a=Object(S.a)({},e.state);a.name=t.target.value,e.setState(a)},e.checkDatabaseForNameEntered=function(){e.props.checkDatabaseForNameEntered(e.state.name)},e.addEnteredNameIntoDatabase=function(){""!==e.state.name?e.props.addEnteredNameIntoDatabase(e.state.name):alert("you can't register without a username!")},e.state={name:""},e}return Object(p.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return this.props.redirectTo?s.a.createElement(R.a,{to:this.props.redirectTo}):s.a.createElement("div",null,s.a.createElement("input",{type:"text",value:this.state.name,onChange:this.changeNameInLocalState}),s.a.createElement(O.a,{to:"/"},s.a.createElement("button",{onClick:this.checkDatabaseForNameEntered},"Login")),s.a.createElement(O.a,{to:"/"},s.a.createElement("button",{onClick:this.addEnteredNameIntoDatabase},"Register")),this.props.showError?s.a.createElement("p",null,"USER NOT FOUND!"):s.a.createElement("p",null))}}]),t}(n.Component),C=a(17),P=a.n(C),D=function(e){function t(){var e;return Object(u.a)(this,t),(e=Object(g.a)(this,Object(h.a)(t).call(this))).checkDatabaseForNameEntered=function(){var t=Object(l.a)(c.a.mark(function t(a){var n;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(""!==a){t.next=4;break}alert("Please enter a name!"),t.next=9;break;case 4:return t.next=6,P.a.get("/users/".concat(a));case 6:(n=t.sent).data[0]?e.setState({currentUser:n.data[0],userFound:!0,redirectTo:"/homepage"}):e.setState({showError:!0}),console.log(e.state);case 9:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),e.addEnteredNameIntoDatabase=function(){var t=Object(l.a)(c.a.mark(function t(a){var n,s;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,P.a.get("/users/".concat(a));case 2:(n=t.sent).data[0]?(console.log(n.data[0]),e.setState({currentUser:n.data[0],userFound:!0,redirectTo:"/homepage"})):(s={userName:a,bestTagsTotalScoreHistory:0,tags:[]},P.a.post("/users",s).then(function(t){console.log("added"),e.setState({currentUser:s,userFound:!0,redirectTo:"/homepage"})}).catch(function(e){console.log(e)}));case 4:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),e.logOut=function(){e.setState({userFound:!1})},e.isAdmin=function(t){1===t&&e.setState({isAdmin:!0})},e.changeGamePhase=function(t){e.setState({gamePhase:t})},e.logOut=function(){console.log("homepage"),e.props.logOut()},e.state={userFound:!1,currentUser:{},showError:!1,redirectTo:null,isAdmin:!1,gamePhase:0},e}return Object(p.a)(t,e),Object(m.a)(t,[{key:"getImageTags",value:function(e){return P.a.get("/image",{params:{str:e}})}},{key:"render",value:function(){var e=this,t=this.state.userFound?"/homepage":"/login";return s.a.createElement(d.a,null,s.a.createElement("div",{className:"App"},s.a.createElement("div",{className:"header"},s.a.createElement("div",{className:"headerLeft"}),s.a.createElement("div",{className:"headerMid"},s.a.createElement(E,{logOut:this.logOut}),s.a.createElement(f.a,{path:"/",exact:!0,render:function(){return s.a.createElement(b.a,{to:t})}}),s.a.createElement(f.a,{path:"/login",exact:!0,render:function(){return s.a.createElement(V,{showError:e.state.showError,checkDatabaseForNameEntered:e.checkDatabaseForNameEntered,addEnteredNameIntoDatabase:e.addEnteredNameIntoDatabase,redirectTo:e.state.redirectTo})}}),s.a.createElement(f.a,{path:"/homepage",exact:!0,render:function(){return s.a.createElement(y,{logOut:e.logOut})}})),s.a.createElement("div",{className:"headerRight"})),s.a.createElement(f.a,{path:"/game",exact:!0,render:function(){return s.a.createElement(U,{getImageTags:e.getImageTags,isAdmin:e.isAdmin,gamePhase:e.state.gamePhase,isAdminState:e.state.isAdmin,changeGamePhase:e.changeGamePhase})}})))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(s.a.createElement(D,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},43:function(e,t,a){},50:function(e,t,a){e.exports=a(126)},55:function(e,t,a){},59:function(e,t,a){},64:function(e,t,a){},72:function(e,t,a){}},[[50,2,1]]]);
//# sourceMappingURL=main.5bffdeb8.chunk.js.map