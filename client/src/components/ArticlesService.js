import axios from 'axios';

class ArticlesService {
    service = axios.create({
            baseURL: 'http://localhost:5000/api',
            withCredentials: true
    });

    newArticle = (title, overview, picFeatured, picCaption, picCredit, author, authorTwitter, authorIG, chapo, articleContent, lang, cat, tags, selectedLang, selectedCat) => {
        return this.service.post('/articles', {title, overview, picFeatured, picCaption, picCredit, author, authorTwitter, authorIG, chapo, articleContent, lang, cat, tags, selectedLang, selectedCat})
        .then(response => response.data)
    };

    getArticle = () => {
        return this.service.get('/articles/:id').then(response => response.data)
    };

    updateArticle = (title, overview, picFeatured, picCaption, picCredit, author, authorTwitter, authorIG, chapo, articleContent, lang, cat, tags, selectedLang, selectedCat) => {
        return this.service.put('/articles/:id', {title, overview, picFeatured, picCaption, picCredit, author, authorTwitter, authorIG, chapo, articleContent, lang, cat, tags, selectedLang, selectedCat}).then(response => response.data)
    };

    allArticles = () => {
        return this.service.get('/articles').then(response => response.data)
    };

}

export default ArticlesService;