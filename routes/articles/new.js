const express = require('express');
const router = express.Router();
const Article = require('../../models/article.js');
const User = require('../../models/user.js');
const uploadCloud = require('../../config/cloudinary.js');


//New article

router.post("/articles", uploadCloud.fields([{name: 'picFeatured', maxCount: 1}, {name: 'picPlaylist', maxCount:1}]), (req, res, next) => {
  if (!req.user) {
    res.status(401).json({message: "You have to log in to create an article!"})
    return;
  }
  
  const article = new Article({ ...req.body });

  if (req.body.title === "" || req.body.author === "" || req.body.articleContent === "") {
    const err = new Error('Your article needs to have at least a title, an author and a body.');
    err.status = 400;
    
    next(err)
    return;
  };

    article

    // enregistrement sur la bdd de l'article
    .save()
      .then(artic => {
        req.user.articles.push(artic);
        req.user.save().then(user => res.json(artic)).catch(next)
      })
      .catch(next)
});


module.exports = router;