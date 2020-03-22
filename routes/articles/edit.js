const express = require('express');
const router = express.Router();
const Article = require('../../models/article.js');
const User = require('../../models/user.js');
const mongoose     = require('mongoose');

// on trouve l'article pour pouvoir l'afficher
router.put("/articles/:id", (req, res, next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    };
    
    const article = req.body;
    Article.update({_id: req.params.id}, {$set: article})
        .then((artic) => {
            res.json(artic);
        })
        .catch((err) => {
            next(err);
        });
});


module.exports = router;
