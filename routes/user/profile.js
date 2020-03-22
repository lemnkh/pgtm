const express = require('express');
const router = express.Router();

const User = require('../../models/user.js');

const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const uploadCloud = require('../../config/cloudinary.js');


/////////////////////////////////
// VIEW PROFILE
///////////

router.get('/user/profile', (req, res) => {
  if (!req.user) {
    res.status(403).json({ message: 'Cannot find user' })
    return;
  };

  User.findOne({_id: req.user.id})
  .then((user) => {
    res.status(201).json({ user: req.user });
  })
  .catch ((err) => {
    console.log(err);
  });
});

/////////////////////////////////
// MODIFY PROFILE
///////////

router.put('/user/profile', uploadCloud.single('profile-pic'), (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password; // undefined
  const profilePic = req.file ? req.file.url : req.user.profilePic;

  // if : req.file && req.file.url; 
  // if else : req.file ? req.file.url : null // opérateur ternair

  // on vérifie que les champs obligatoires ne sont pas vides 
  if (name === "" || password === "" || email === "") {
    res.status(401).json({ message: "Hold on there! You need to enter a username, an email address and a password to register." });
    return;
  }

  User.findOne({ email })
    .then(user => {
      // on vérifie si l'adresse n'est pas déjà enregistrée
      if (user !== null && JSON.stringify(user._id) !== JSON.stringify(req.user._id)) {
        res.status(400).json({ "message": "Oh-oh! This email address is already registered." });
        return;
      }

      let hashPass;
      if (password) {
        // un même mdp est encrypté toujours pareil pour 1 même "secret"
        const salt = bcrypt.genSaltSync(bcryptSalt);
        hashPass = bcrypt.hashSync(password, salt);
      }

      let obj = {name,email,profilePic}
      if (hashPass) {
        obj.password = hashPass;
      }

      // update
      User.findOneAndUpdate({_id: req.user.id}, {$set: obj}, {new: true})
        .then(updatedUser => {
          res.status(200).json(updatedUser);
        })
        .catch(err => {
          next(err);
        })

    })
    .catch(err => {
      next(err)
    });
});

// il faut exporter pour que ça marche :p
module.exports = router;