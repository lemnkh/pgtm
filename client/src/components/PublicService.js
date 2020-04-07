import axios from 'axios';

class PublicService {
    service = axios.create({
            baseURL: `${process.env.REACT_APP_APIURL || ''}/api`,
            withCredentials: false
    });

    getArticle = (id) => {
        return this.service.get('/articles/published/' + id).then(response => response.data)
    };

    allArticles = () => {
        return this.service.get('/articles/all').then(response => response.data)
    };

    getPlaylist = (id) => {
        return this.service.get('/playlists/published/' + id).then(response => response.data)
    };

    allPlaylists = () => {
        return this.service.get('/playlists/all').then(response => response.data)
    };

    latestArticle = () => {
        return this.service.get('/latest').then(response => response.data)
    }
}

export default PublicService;