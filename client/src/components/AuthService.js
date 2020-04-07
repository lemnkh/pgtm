import axios from 'axios';

class AuthService {
    service = axios.create({
            baseURL: `${process.env.REACT_APP_APIURL || ''}/api`,
            withCredentials: true
    });

    signup = (user) => {
        return this.service.post('/signup', user)
            .then(response => {
                return response.data
            })
            // .catch(err => {
            //     console.log('tis the message', err.message)
            //     throw err
            // })
    };

    // file upload
    upload = (file) => {
        return this.service.post('/users/upload', file)
            .then(response => response.data)
    };

    // session user
    loggedin = () => {
        return this.service.get('/loggedin')
            .then(response => response.data)
    };

    login = (email, password) => {
        return this.service.post('/login', {email, password})
            .then(response => response.data)
    };
    
    logout = () => {
        return this.service.get('/logout', {})
            .then(response => response.data)
    };

    // profile

    getProfile = () => {
        return this.service.get('/user/profile').then(response => response.data)
    }

    updateProfile = (user) => {
        return this.service.put('/user/profile', user)
            .then(response => response.data)
    };
}

export default AuthService;