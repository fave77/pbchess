import axios from 'axios';
import configAPI from '../configs/api.config';
import authHeader from './auth.header';

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

  register(fullname, email, username, password) {
    return axios.post(API_URL + 'register', {
      fullname,
      email,
      username,
      password
    })
    .then(res => {
      if (res.data.success)
        localStorage.setItem('user', JSON.stringify(res.data));
      return res.data;
    });
  }

  confirm(userId){
    return axios.post(API_URL + 'confirm', {
      userId
    }).then(res => res.data);
  }

  changePassword(oldPassword, newPassword, userId){
    
    return axios.put(API_URL + 'password/update', {
      oldPassword,
      newPassword,
      userId
    }, {
      headers: authHeader()
    }).then(res => res.data);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
