import { http } from '../http';
import { URL } from '../base';

class User {
  constructor() {
    this.usersList = [];
    this.loggedUser = {};
    this.isLoggedIn = false;
  }

  getAllUsers() {
    http.get(URL)
    .then(users => this.usersList = [...users]) 
    .catch(err => console.log(err));
  }


  loginUser(user) {
    this.loggedUser = user;
    this.isLoggedIn = true;
  }

  registrationUser(username, password) {
    const user = {
        "id": this.usersList.length + 1,
        "username": username,
        "password": password,
        "tasks": []
      }

    http.post(URL, user)
    .then(user => {
      console.log('Well done! You added a new user!');
      this.getAllUsers();
    })
    .catch(err => console.log(err))
  }
}

export default User;
