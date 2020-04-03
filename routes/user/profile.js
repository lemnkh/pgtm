const express = require('express');
const router = express.Router();

const User = require('../../models/user.js');

const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const uploadCloud = require('../../config/cloudinary.js');

const passport = require("passport");


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
    console.log("user found", user);
    res.status(201).json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      password: req.user.password,
      profilePic: req.user.profilePic
     });
  })
  .catch ((err) => {
    console.log(err);
  });
});

/////////////////////////////////
// MODIFY PROFILE
///////////

router.put('/user/profile', (req, res, next) => {
  const name = req.body.name;
  const currentEmail = req.user.email;
  const email = req.body.email
  const password = req.body.password; // undefined
  const profilePic = req.body.profilePic;

  // if : req.file && req.file.url; 
  // if else : req.file ? req.file.url : null // opérateur ternair

  // on vérifie que les champs obligatoires ne sont pas vides 
  if (name === "" || email === "") {
    res.status(401).json({ message: "Hold on there! You need to enter a username, an email address and a password to register." });
    return;
  }

  User.findOne({ currentEmail })
    .then(user => {

      let hashPass;
      
        // un même mdp est encrypté toujours pareil pour 1 même "secret"
        const salt = bcrypt.genSaltSync(bcryptSalt);
        hashPass = bcrypt.hashSync(password, salt);
      

      let obj = {
        name,
        email,
        profilePic
      };
      if (hashPass === req.user.password || password === "") {
        obj.password = hashPass;
        console.log("password same");
      }
      
      if (currentEmail === email || email === "") {
        obj.email = currentEmail;
        console.log("email same", obj.email);
      }

      if (name === req.user.name || name === "") {
        obj.name = req.user.name;
        console.log("name same", obj.name);
      }

      if (profilePic === req.user.profilePic || profilePic === "" || profilePic === null || profilePic === undefined) {
        obj.profilePic = req.user.profilePic;
        console.log("pp same", obj.profilePic);
      }

      console.log("obj=", obj, "req.user", req.user, "just user", user);

      // update
      // User.findOneAndUpdate({_id: req.user._id}, {$set: obj}, {new: true})
      //   .then(updatedUser => {
      //     res.status(200).json(updatedUser);
      //   })
      //   .catch(err => {
      //     next(err);
      //   })

    User.update({_id: req.user.id}, {$set: obj})
        .then((user) => {
          console.log("updated user", user)
            res.json(obj);
        })
        .catch((err) => {
            next(err);
        });

    })
    .catch(err => {
      next(err)
    });
});

// il faut exporter pour que ça marche :p
module.exports = router;