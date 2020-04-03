const express = require('express');
const router = express.Router();

const uploader = require('../../config/cloudinary');

router.post('/users/upload', uploader.single("profilePic"), (req, res, next) => {
    // console.log('file is: ', req.file)

    if (!req.file) {
        res.status(400).json({message: "No file uploaded!"});
        return;
    };

    res.json({ secure_url: req.file.secure_url });
    
})

router.post('/articles/upload', uploader.single("picFeatured"), (req, res, next) => {
    console.log('file is: ', req.file)

    if (!req.file) {
      next(new Error('No file uploaded!'));
      return;
    }
    // get secure_url from the file object and save it in the 
    // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
    res.json({ secure_url: req.file.secure_url });
})

router.post('/playlists/upload', uploader.single("picPlaylist"), (req, res, next) => {
    // console.log('file is: ', req.file)

    if (!req.file) {
      next(new Error('No file uploaded!'));
      return;
    }
    // get secure_url from the file object and save it in the 
    // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
    res.json({ secure_url: req.file.secure_url });
})

module.exports = router;