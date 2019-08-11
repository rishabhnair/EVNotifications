const express = require('express');
//const router = express.Router();
const fs = require('fs');
const passport = require('passport');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const app = express();
const bodyParser = require('body-parser');


app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};


function UpdateChargerLocation (emails, id) {
  User.findOne({email: emails}).then(user => {

      var newvalues = { $set: {ChargerLocation: id} }

      if (user) {
        User.updateOne(user, newvalues, function(err,res){
          if (err) {
              throw err;
          } else {
              console.log("poleID updated");
          }
      });
      } else {
        const newUser = new User({
          name,
          slackID
        });
        newUser.save()
                .then(user => {
                    res.send({'message': 'User CREATED'});
                }).catch(err => console.log(err));

 
              }
  });

}

// Get request
app.get('/ev', (req, res) => {
    const Data = fs.readFileSync( './data.json');
    res.status(200).json(JSON.parse(Data))
});

app.post('/login', function(req, res, next) {

    const { email, password } = req.body;

    passport.authenticate('local', function(err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(400).send('Invalid username or password');
        }

        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }

            // res.send({message: 'User authenticated', "username" : user.name});
            res.send({message: 'User authenticated'});
        });
    })(req, res, next);
});

app.post('/register', (req, res, next) => {

    const { name, email, password, password2 } = req.body;

    let errors = [];

      User.findOne({ email: email }).then(user => {
        if (user) {
          errors.push({ 'message': 'Email already exists' });
          res.send({'message': 'ALREADY'});
        } else {
          const newUser = new User({
            name,
            email,
            password
          });
  
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => {
                    res.send({'message': 'User CREATED'});
                }).catch(err => console.log(err));
            });
          });
        }
      });
    
  });


app.post('/confirm', function(req, res, next) {
    //console.log(req.body);

    let poleID = req.body.poleID
    let emailString = req.body.email

    UpdateChargerLocation(emailString,poleID);
    res.send({'message': 'User location updated!!'});
});

module.exports = app;