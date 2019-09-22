import axios from 'axios'; 

//const API_URL: string = `${window.location.protocol}//${window.location.host}`;
const API_URL: string = 'http://localhost:5050';

const getUserEmailExist: (email: string) => Promise<any> = (email) => {
    let params = {
        params: {
            user_email: email, 
        }
    }
    return axios.get(API_URL + '/api/user/email_exist', params)
        .then(response => {return response.data});
}

const postUserSignIn: (email: string, password: string) => Promise<any> = (email, password) => {
    let params = {
        params: {
            user_email: email,
            user_password: password, 
        }
    }
    return axios.post(API_URL + '/api/user/sign_in', params)
        .then(response => {return response.data});
}

export default {getUserEmailExist};