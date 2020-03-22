const express = require('express');
const router = express.Router();
const Article = require('../../models/article.js');
const User = require('../../models/user.js');
const uploadCloud = require('../../config/cloudinary.js');
const moment = require('moment');

//All : afficher tous les articles d'un user
router.get('/articles', function (req, res, next) {
  if (!req.user) {
    res.status(401).json({message: "You have to log in to view your articles"})
    return;
  }
  const id = req.user._id;
  User.findById(id)
      .populate('articles')
      .then((user) => {
        const articlesMod = user.articles.map(art => {
          art.updatedAt = moment(art.updated_at).format("DD/MM/YYYY at h:mm:ss a");
          art.createdAt = moment(art.created_at).format("DD/MM/YYYY at h:mm:ss a");
          return art;
        });
        console.log(articlesMod);
        
        res.json(art, {
          name: user.name,
          profilePic: user.profilePic,
          articles: articlesMod
        });
        
      })
      .catch(next);
  });

module.exports = router;