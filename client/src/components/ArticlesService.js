import axios from 'axios';

class ArticlesService {
    service = axios.create({
            baseURL: 'https://pgtm.herokuapp.com/api',
            withCredentials: true
    });

    // file upload
    uploadPicFeatured = (pic) => {
        return this.service.post('/articles/upload', pic)
          .then(response => response.data)
    };

    uploadPicPlaylist = (pic) => {
        return this.service.post('/playlists/upload', pic)
          .then(response => response.data)
    };

    // create article
    newArticle = (title, overview, picFeatured, picCaption, picCredit, author, authorTwitter, authorIG, chapo, articleContent, lang, cat, tags) => {
        return this.service.post('/articles', {title, overview, picFeatured, picCaption, picCredit, author, authorTwitter, authorIG, chapo, articleContent, lang, cat, tags})
        .then(response => response.data)
    };

    newPlaylist = (title, overview, picFeatured, picCaption, picCredit, picPlaylist, playlistSpotify, playlistDeezer, playlistYoutube, author, authorTwitter, authorIG, chapo, articleContent, lang, cat, tags) => {
        return this.service.post('/playlists', {title, overview, picFeatured, picCaption, picCredit, picPlaylist, playlistSpotify, playlistDeezer, playlistYoutube, author, authorTwitter, authorIG, chapo, articleContent, lang, cat, tags})
        .then(response => response.data)
    };

    // edit article
    getArticle = (id) => {
        return this.service.get('/articles/' + id).then(response => response.data)
    };

    getPlaylist = (id) => {
        return this.service.get('/playlists/' + id).then(response => response.data)
    };

    updatePlaylist = (id, title, overview, picFeatured, picCaption, picCredit, picPlaylist, playlistSpotify, playlistDeezer, playlistYoutube, author, authorTwitter, authorIG, chapo, articleContent, lang, cat, tags) => {
        return this.service.put('/playlists/' + id, {title, overview, picFeatured, picCaption, picCredit, picPlaylist, playlistSpotify, playlistDeezer, playlistYoutube, author, authorTwitter, authorIG, chapo, articleContent, lang, cat, tags}).then(response => response.data)
    };

    updateArticle = (id, title, overview, picFeatured, picCaption, picCredit, author, authorTwitter, authorIG, chapo, articleContent, lang, cat, tags) => {
        return this.service.put('/articles/' + id, {title, overview, picFeatured, picCaption, picCredit, author, authorTwitter, authorIG, chapo, articleContent, lang, cat, tags}).then(response => response.data)
    };

    // delete article
    deleteArticle = (id) => {
        return this.service.delete('/articles/' + id).then(response => response.data)
    };

    deletePlaylist = (id) => {
        return this.service.delete('/playlists/' + id).then(response => response.data)
    };

    // all articles private
    allArticlesUser = () => {
        return this.service.get('/user/articles').then(response => response.data)
    };

    allPlaylistsUser = () => {
        return this.service.get('/user/playlists').then(response => response.data)
    };

}

export default ArticlesService;