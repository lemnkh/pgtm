import axios from 'axios';

class AuthService {
    service = axios.create({
            baseURL: 'http://localhost:5000/api',
            withCredentials: true
    });

    signup = (name, email, password, profilePic) => {
        return this.service.post('/signup', {name, email, password, profilePic})
        .then(response => response.data)
    };

    // file upload
    upload = (formdata) => {
        return this.service.post('/upload', formdata)
          .then(response => response.data)
    };

    // session user
    loggedin = () => {
        return this.service.get('/loggedin').then(response => response.data)
    };

    login = (email, password) => {
        return this.service.post('/login', {email, password})
        .then(response => response.data)
    };
    
    logout = () => {
        return this.service.post('/logout', {})
        .then(response => response.data)
    };
}

export default AuthService;