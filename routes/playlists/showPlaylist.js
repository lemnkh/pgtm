const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const Playlist = require('../../models/playlist.js');

const moment = require('moment');

// on trouve l'article pour pouvoir l'afficher
router.get("/playlists/:id", (req, res, next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    };
    
    Playlist.findById(req.params.id)
        .then((play) => {
            console.log("consoling", play);
            res.json(play);
        })
        .catch((err) => {
            next(err);
        });
});

// pour affichage publique
router.get("/playlists/published/:id", (req, res, next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    };
    
    Playlist.findById(req.params.id)
        .then((play) => {
            res.json({
                playlist: play,
                created: moment(play.created_at).format("MMMM Do, YYYY — h:mm a"),
                updated: moment(play.updated_at).format("MMMM Do, YYYY — h:mm a")
            });
        })
        .catch((err) => {
            next(err);
        });
});


module.exports = router;
