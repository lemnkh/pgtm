const express = require('express');
const router = express.Router();
const Article = require('../../models/article.js');
const User = require('../../models/user.js');
const mongoose     = require('mongoose');

// on trouve l'article pour pouvoir l'afficher
router.delete("/articles/:id", (req, res, next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    };
    
    Article.findByIdAndRemove(req.params.id)
        .then(() => {
            res.json({message: 'The article was successfully deleted!'});
        })
        .catch((err) => {
            next(err);
        });
});


module.exports = router;
