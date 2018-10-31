import { observable, action } from 'mobx';
import axios from 'axios'
class UserStore {

    @observable user="Alex"


}

const store = new UserStore();
export default store; 