const express = require('express');
const router = express.Router();
const Playlist = require('../../models/playlist.js');
const User = require('../../models/user.js');



//New article playlist
router.post("/playlists", (req, res, next) => {
  if (!req.user) {
    res.status(401).json({message: "You have to log in to create an article!"})
    return;
  }
  
  const playlist = new Playlist({ ...req.body });

  if (req.body.title === "" || req.body.author === "" || req.body.articleContent === "") {
    const err = new Error('Your article needs to have at least a title, an author and a body.');
    err.status = 400;
    
    next(err)
    return;
  };

  console.log("playlist", playlist);

    

    // enregistrement sur la bdd de la playlist
    playlist.save()
      .then(play => {
        console.log("hello");
        req.user.playlists.push(play);
        req.user.save().then(user => res.json(play)).catch(next)
      })
      .catch(next)
});


module.exports = router;