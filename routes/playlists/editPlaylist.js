const express = require('express');
const router = express.Router();
const Playlist = require('../../models/playlist.js');
const User = require('../../models/user.js');
const mongoose     = require('mongoose');

// on trouve la playlist pour pouvoir l'afficher
router.put("/playlists/:id", (req, res, next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    };
    
    const playlist = req.body;
    
    Playlist.update({_id: req.params.id}, {$set: playlist})
        .then((play) => {
            res.json(play);
        })
        .catch((err) => {
            next(err);
        });
});


module.exports = router;
