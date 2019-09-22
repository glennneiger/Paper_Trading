import axios from 'axios'; 

//const API_URL: string = `${window.location.protocol}//${window.location.host}`;
const API_URL: string = 'http://localhost:5050';

const getUserEmailExist: (email: string) => Promise<any> = (email) => {
    return axios.get(API_URL + '/api/user/email_exist', { params: {user_email: email}})
        .then(response => {return response.data});
}

export default {getUserEmailExist};