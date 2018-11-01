import { observable, action } from 'mobx';
import axios from 'axios'
import UploadPic from '../components/game-best-tags/UploadPic'



class UserStore {

    @observable userFound = false;
    @observable currentUser = {};
    @observable showError = false;
    @observable redirectTo = null;
    @observable isAdmin = false;
    @observable gamePhase = 0;
    @observable gameBegan = false;
    @observable inputValue = "";
    @observable gameActive = true;
    @observable imageTags = null;
    @observable imageURLs = [
        { url: "https://www.rspcansw.org.au/wp-content/uploads/2017/08/50_a-feature_dogs-and-puppies_mobile.jpg", votes: 0 },
        { url: "https://www.cesarsway.com/sites/newcesarsway/files/styles/large_article_preview/public/Common-dog-behaviors-explained.jpg?itok=FSzwbBoi", votes: 0 },
        { url: "https://images.theconversation.com/files/205966/original/file-20180212-58348-7huv6f.jpeg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip", votes: 0 },
        { url: "https://i2-prod.mirror.co.uk/incoming/article9769854.ece/ALTERNATES/s615/PROD-Mixed-breed-lab-cross-8-week-old-puppy-in-farm-yard-near-Cochrane-AlbertajpgED.jpg", votes: 0 },
        { url: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA5Ny84OTEvb3JpZ2luYWwvd2h5LWRvZ3MtZWF0LXBvb3A=", votes: 0 },
        { url: "https://www.mensjournal.com/wp-content/uploads/gettyimages-583596559-e274095b-2e49-481a-b1d1-de6bfee9e588.jpg", votes: 0 }
    ];
    @observable haveSentURL = false;
    @observable numberOfVotes = 0;

    @action getImageTags(str) {
        return axios.get('http://localhost:8080/image', {
            params: {
                str: str
            }
        })
    }

    @action checkDatabaseForNameEntered = async (str) => {
        if (str === "") {
            alert("Please enter a name!")
        } else {
            let data = await axios.get(`http://localhost:8080/users/${str}`)
            if (data.data[0]) {
                this.currentUser = data.data[0];
                this.userFound = true;
                this.redirectTo = "/homepage";
            } else {
                this.showError = true
            }
            console.log(this.state)
        }
    }

    @action addEnteredNameIntoDatabase = async (str) => {
        let data = await axios.get(`http://localhost:8080/users/${str}`)
        if (data.data[0]) {
            this.currentUser = data.data[0];
            this.userFound = true;
            this.redirectTo = "/homepage";
        } else {
            let newUser = {
                userName: str,
                bestTagsTotalScoreHistory: 0,
                tags: []
            }
            axios.post('http://localhost:8080/users', newUser)
                .then((data) => {
                    this.currentUser = newUser;
                    this.userFound = true;
                    this.redirectTo = "/homepage";
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    @action logOut = () => {
        this.userFound = false
    }

    @action isAdmin = (value) => {
        if (value === 1) {
            this.isAdmin = true;
        }
    }

    @action changeGamePhase = (num) => {
        this.gamePhase = num;
    }

    @action startTimerInSocket = () => {
        this.gameBegan = true;
    }

}

const store = new UserStore();
export default store; 