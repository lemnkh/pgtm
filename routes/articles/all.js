const express = require('express');
const router = express.Router();
const Article = require('../../models/article.js');
const User = require('../../models/user.js');
const uploadCloud = require('../../config/cloudinary.js');
const moment = require('moment');

//afficher tous les articles d'un user
router.get('/user/articles', function (req, res, next) {
  if (!req.user) {
    res.status(401).json({message: "You have to log in to view your articles"})
    return;
  }
  User.findById(req.user._id)
      .populate('articles')
      .then((user) => {
        const articlesMod = user.articles.map(article => {
          article.updatedAt = moment(article.updated_at).format("DD/MM/YYYY at h:mm:ss a");
          article.createdAt = moment(article.created_at).format("DD/MM/YYYY at h:mm:ss a");
          console.log("coucou je suis passé par le then");
          return article;
        });

        user.articles = articlesMod;
        

        res.json({
          name: user.name || "",
          profilePic: user.profilePic || "",
          articles: articlesMod || []
        });
        console.log(user);
        
      })
      .catch(next);
  });

  //afficher TOUS les articles
  // find tout seul


  router.get('/articles', function (req, res, next) {
    if (!req.user) {
      res.status(401).json({message: "You have to log in to view your articles"})
      return;
    }
    Article.find()
        .then((allArticles) => {
          const allArticlesMod = allArticles.map(article => {
            article.updatedAt = moment(article.updated_at).format("dddd, MMMM Do YYYY at h:mm a");
            article.createdAt = moment(article.created_at).format("dddd, MMMM Do YYYY at h:mm a");
            console.log("coucou je suis passé par le then");
            return article;
          });
          
          res.json({allArticlesMod});
          
        })
        .catch(next);
    });


module.exports = router;