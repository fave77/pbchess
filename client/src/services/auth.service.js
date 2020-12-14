import axios from 'axios';
import configAPI from '../configs/api.config';

const API_URL = configAPI();

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + 'login', {
        username,
        password
      })
      .then(res => {
        if (res.data.success)
          localStorage.setItem('user', JSON.stringify(res.data));
        return res.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(username, password) {
    return axios.post(API_URL + 'register', {
      username,
      password
    })
    .then(res => {
      if (res.data.success)
        localStorage.setItem('user', JSON.stringify(res.data));
      return res.data;
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
