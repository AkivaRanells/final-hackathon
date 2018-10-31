import { observable, action } from 'mobx';
import axios from 'axios'
class UserStore {
    @observable objOne = "hi";

}

const store = new UserStore();
export default store; 