const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const mime = require('mime');
const bodyParser = require('body-parser')
const engines = require("consolidate");
const router = express.Router();
const fs = require('fs');
const cors = require('cors'); 
const LocalStrategy = require('passport-local').Strategy;

const app = express();
app.use(cors());



// API 
app.use(flash());


// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


// EJS
//app.use(expressLayouts);
app.set('view engine', 'html');
app.use("/", express.static(path.join(__dirname, "views", "AngularBuild", "angular")));    // folder where angular will be installed
app.use(bodyParser.urlencoded({extended: false}))
app.engine('html', engines.mustache);


// app.use('/api/ev', require('./EVBackend/pingResp.js'))

// Express body parser
app.use(express.urlencoded({ extended: true }));

// return angular page 
app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
   "Origin, X-Requested-With, Content-Type, Accept"
   );
   res.setHeader("Access-Control-Allow-Methods", "GET, POST");
   next();
});

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


// Routes
const getReq = require('./getReq.js');
app.use('/api', getReq);

const slackReq = require('./slackReq.js');
app.use('/slack', slackReq);

app.use('/pingResp', require('./EVBackend/pingResp'));


const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));