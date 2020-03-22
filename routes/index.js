const express = require('express');
const router  = express.Router();

const User = require('../models/user.js');
const Article = require('../models/article.js');
const uploadCloud = require('../config/cloudinary.js');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;
