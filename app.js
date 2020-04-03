require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const session = require("express-session");
const MongoStore = require('connect-mongo')(session);
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const flash = require("connect-flash");
const cors = require('cors');

const User = require('./models/user.js');

mongoose
  .connect(process.env.MONGODB_URI, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');
// app.use(express.static(path.join(__dirname, 'client/build')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// express session
app.use(session({
  secret: "our-passport-local-strategy-app",
  // ne pas oublier le store pour que la connexion se réinitialise pas
  store: new MongoStore( { mongooseConnection: mongoose.connection }),
  resave: true,
  saveUninitialized: true
}));

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

app.use(flash());
passport.use(new LocalStrategy({
  passReqToCallback: true,
  // pour dire à passport qu'on utilise pas le nom "username"
  usernameField: 'email'
}, (req, email, password, next) => {
  User.findOne({ email }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: "Incorrect email" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Incorrect password" });
    }

    return next(null, user);
  });
}));

app.use(passport.initialize());
app.use(passport.session());

// default value for title local
app.locals.title = 'NPP - Get posting!';

app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(err.status || 500);
    res.json({message: err.message});
  }
});

/* CORS POUR FAIRE LE LIEN ENTRE BASE ET FRONT, COTE BACK */

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000']
}));

/* ROUTES USER */

app.use('/api', require('./routes/user/auth.js'));
app.use('/api', require('./routes/user/profile.js'));


/* ROUTES ARTICLES */

app.use('/api', require('./routes/articles/new.js')); // POST nouveau article
app.use('/api', require('./routes/articles/edit.js')); // PUT éditer un article
app.use('/api', require('./routes/articles/delete.js')); // DELETE un article

app.use('/api', require('./routes/articles/all.js')); // GET tous les articles

app.use('/api', require('./routes/articles/show.js')); // GET voir l'article, sans être un user

app.use('/api', require('./routes/articles/queries.js')); // GET info pour homepage

/* IMAGE UPLOAD ROUTE */

app.use('/api', require('./routes/articles/imagesUpload.js'));

app.use(express.static(path.join(__dirname, 'client/build')));

// route not-found => could be a React route => render the SPA
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'), function (err) {
    if (err) {
      next(err)
    }
  })
});

module.exports = app;
