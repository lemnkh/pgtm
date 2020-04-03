const express = require('express');
const router = express.Router();
const Article = require('../../models/article.js');
const User = require('../../models/user.js');
const mongoose     = require('mongoose');

// on trouve l'article pour pouvoir l'afficher
router.get("/latest", (req, res, next) => {

    Article.find().limit(1).sort({$natural:-1})
        .then(artic => {
            console.log("response", artic)
            res.json(artic);
        })
        .catch(err => console.log(err))
    
});


module.exports = router;