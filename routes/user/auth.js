const express = require('express');
const router = express.Router();

const User = require('../../models/user.js');

const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const uploadCloud = require('../../config/cloudinary.js');

const passport = require("passport");

/////////////////////////////////
// SIGNUP
///////////

router.post("/signup", uploadCloud.single('profile-pic'), (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const profilePic = req.file && req.file.url;
  // req.file ? req.file.url : null 

  // on vérifie que les champs obligatoires ne sont pas vides 
  if (name === "" || password === "" || email === "") {
    res.status(401).json({ message: "Hold on there! You need to enter a media name, an email address and a password to register" });
    return;
  }

  User.findOne({ email })
    .then(user => {
      // on vérifie si l'adresse n'est pas déjà enregistrée
      if (user !== null) {
        res.status(401).json({ message: "Oh-oh! This email address is already registered." });
        return;
      }

      // c'est ok, on encrypte le mdp
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      // on enregistre l'utilisateur dans notre base de données
      const newUser = new User({
        name,
        email,
        password: hashPass,
        profilePic
      });

      newUser.save()
        .then(user => {
          // on crée la session de l'utilisateur pour le connecter right away
          req.login(user, err => {
            if (err) {
              res.status(500).json({ message: 'There was an issue with the login after registration of the user :(' });
              return;
            };
            res.status(200).json(newUser);
          });
        })
        .catch(err => {
          next(err)
        });
    })
    .catch(err => {
      next(err)
    });
});

/////////////////////////////////
// LOGIN
///////////

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, failureDetails) => {
      if (err) {
          res.status(500).json({ message: 'Something went wrong, cannot log in' });
          return;
      }
  
      if (!user) {
          res.status(401).json(failureDetails);
          return;
      }

      // on enregistre la session du user
      req.login(user, (err) => {
          if (err) {
              res.status(500).json({ message: 'Uh-oh. Cannot save user session' });
              return;
          }

          // user est logged in, yay!!! on peut utiliser req.user
          res.status(200).json(user);
      });
  })(req, res, next); // important
});



// logged in ou pas ???
router.get('/loggedin', (req, res, next) => {
  if (!req.user) {
    res.status(403).json({ message: "Not logged in" });
    return;
  }
  // yes logged in, voici les infos du user
  res.status(200).json(req.user)
});

// pour le logout
router.get('/logout', (req, res) => {
  req.logout();
  res.status(204).json({ message: 'Logged out successfully' });
});

module.exports = router;
