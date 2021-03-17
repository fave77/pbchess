import axios from 'axios';
import configAPI from '../configs/api.config';

const API_URL = configAPI();

// Sends a post request when a user signs in using google
class GoogleAuthService {

    
    signIn(fullname, email, username, password, type) {
        return axios.post(API_URL + 'signin/google', {
            fullname,
            email,
            username,
            password,
            type
        }).then(res => {
                if (res.data.success){
                    localStorage.setItem('user', JSON.stringify(res.data));
                }
                    
                return res.data;
            });
    }
}

export default new GoogleAuthService();
