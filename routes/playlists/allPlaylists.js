const express = require('express');
const router = express.Router();
const Playlist = require('../../models/playlist.js');
const User = require('../../models/user.js');
const uploadCloud = require('../../config/cloudinary.js');
const moment = require('moment');

//afficher tous les articles d'un user
router.get('/user/playlists', function (req, res, next) {
  if (!req.user) {
    res.status(401).json({message: "You have to log in to view your articles"})
    return;
  }
  User.findById(req.user._id)
      .populate('playlists')
      .then((user) => {
        const playlistsMod = user.playlists.map(playlist => {
          playlist.updatedAt = moment(playlist.updated_at).format("DD/MM/YYYY at h:mm:ss a");
          playlist.createdAt = moment(playlist.created_at).format("DD/MM/YYYY at h:mm:ss a");
          console.log("coucou je suis passé par le then");
          return playlist;
        });

        user.playlists = playlistsMod;
        

        res.json({
          playlists: playlistsMod || []
        });
        console.log(user);
        
      })
      .catch(next);
  });

  //afficher TOUS les articles
  // find tout seul


  router.get('/playlists/all', function (req, res, next) {
    Playlist.find().sort({_id:-1})
        .then((allPlaylists) => {
          const allPlaylistsMod = allPlaylists.map(playlist => {
            playlist.updatedAt = moment(playlist.updated_at).format("dddd, MMMM Do YYYY at h:mm a");
            playlist.createdAt = moment(playlist.created_at).format("dddd, MMMM Do YYYY at h:mm a");
            console.log("coucou je suis passé par le then");
            return playlist;
          });
          
          res.json({allPlaylistsMod});
          
        })
        .catch(next);
    });


module.exports = router;