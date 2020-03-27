import axios from 'axios';

class ArticlesService {
    service = axios.create({
            baseURL: 'http://localhost:5000/api',
            withCredentials: true
    });

    newArticle = (title, overview, picFeatured, picCaption, picCredit, author, authorTwitter, authorIG, chapo, articleContent, lang, cat, tags) => {
        return this.service.post('/articles', {title, overview, picFeatured, picCaption, picCredit, author, authorTwitter, authorIG, chapo, articleContent, lang, cat, tags})
        .then(response => response.data)
    };

    getArticle = (id) => {
        return this.service.get('/articles/' + id).then(response => response.data)
    };

    updateArticle = (id, title, overview, picFeatured, picCaption, picCredit, author, authorTwitter, authorIG, chapo, articleContent, lang, cat, tags) => {
        return this.service.put('/articles/' + id, {title, overview, picFeatured, picCaption, picCredit, author, authorTwitter, authorIG, chapo, articleContent, lang, cat, tags}).then(response => response.data)
    };

    deleteArticle = (id) => {
        return this.service.delete('/articles/' + id).then(response => response.data)
    };

    allArticlesUser = () => {
        return this.service.get('/user/articles').then(response => response.data)
    };

    allArticles = () => {
        return this.service.get('/articles').then(response => response.data)
    };
}

export default ArticlesService;