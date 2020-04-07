import axios from 'axios';

class AuthService {
    service = axios.create({
            baseURL: 'https://pgtm.herokuapp.com/api',
            withCredentials: true
    });

    signup = (user) => {
        return this.service.post('/signup', user)
            .then(response => response.data)
            .catch(err => console.error(err))
    };

    // file upload
    upload = (file) => {
        return this.service.post('/users/upload', file)
            .then(response => response.data)
            .catch(err => console.error(err))
    };

    // session user
    loggedin = () => {
        return this.service.get('/loggedin')
            .then(response => response.data)
            .catch(err => console.error(err))
    };

    login = (email, password) => {
        return this.service.post('/login', {email, password})
            .then(response => response.data)
            .catch(err => console.error(err))
    };
    
    logout = () => {
        return this.service.get('/logout', {})
            .then(response => response.data)
            .catch(err => console.error(err))
    };

    // profile

    getProfile = () => {
        return this.service.get('/user/profile').then(response => response.data)
    }

    updateProfile = (user) => {
        return this.service.put('/user/profile', user)
            .then(response => response.data)
            .catch(err => console.error(err))
    };
}

export default AuthService;