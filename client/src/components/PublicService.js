import axios from 'axios';

class PublicService {
    service = axios.create({
            baseURL: 'http://localhost:5000/api',
            withCredentials: false
    });

    getArticle = (id) => {
        return this.service.get('/articles/' + id).then(response => response.data)
    };

    allArticles = () => {
        return this.service.get('/articles').then(response => response.data)
    };

    latestArticle = () => {
        return this.service.get('/latest').then(response => response.data)
    }
}

export default PublicService;