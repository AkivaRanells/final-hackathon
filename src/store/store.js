import { observable, action } from 'mobx';
import axios from 'axios'
class UserStore {

    @observable userFound = false;
    @observable currentUser = {};
    @observable showError = false;
    @observable redirectTo = null;
    @observable isAdmin = false;
    @observable gamePhase = 0;

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

    @action   changeGamePhase = (num) => {
        this.gamePhase = num;
      }


}

const store = new UserStore();
export default store; 