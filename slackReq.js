const express = require('express');
//const router = express.Router();
const fs = require('fs');
const passport = require('passport');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');

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


function UpdateChargerLocationSlack (slackID, poleID) {
  User.findOne({slackID: slackID}).then(user => {

	  var newvalues = { $set: {ChargerLocation: poleID} }

	  if (user) {
		  console.log('user already exists: ' + slackID)
		  User.updateOne(user, newvalues, function(err,res){
			if (err) {
				throw err;
			} else {
				console.log("poleID updated to " + poleID + ' for user: ' + slackID);
			}
		  });
	  } else {
		  console.log('Creating new user: ' + slackID)
		  const newUser = new User({
			ChargerLocation: poleID,
			slackID: slackID
		  });
		  newUser.save()
		  .then(user => {
			 console.log('New user ' + slackID + ' created with poleID ' + poleID);
		  }).catch(err => console.log(err));
	  }
  });
}

app.post('/register', function(req, res) {
  	res.sendStatus(200);

	let slackID = req.body.user_id
	let text = req.body.text

	text = text.replace(/^0+/, '');
	let poleNum = text.substring(0, text.length-1)
	let poleSide = text.substring(text.length-1)
	console.log(poleNum)
	console.log(poleSide)

	let responseUrl = req.body.response_url

	console.log(slackID + ' reg to charge at Pole ' + poleNum + poleSide)

	var poleIDPrefix = '600' + poleNum
	var poleIDSide = ''
	if(poleSide.toUpperCase() === 'R'){
		console.log('Right')
		poleIDSide = '00'
	} else if(poleSide.toUpperCase() === 'L'){
		console.log('Left')
		poleIDSide = '01'
	}

   var poleID = parseInt(poleIDPrefix + poleIDSide)
   console.log('PoleID: ' + poleID)
   UpdateChargerLocationSlack(slackID, poleID);

  request.post(
	  responseUrl,
	  { json: {
		"text": "You have been registered as charging at Pole " + poleNum,
		"attachments": [
			{
				"text":"You will be notified when your car finishes charging."
			}
		]
	} },
	  function (error, response, body) {
		  if (!error && response.statusCode == 200) {
			  console.log(body);
		  }
	  }
  );
});

app.post('/wait', function(req, res) {
	res.sendStatus(200);

	let slackID = req.body.user_id
	let poleNum = req.body.text
	poleNum = poleNum.replace(/^0+/, '');
	let responseUrl = req.body.response_url

	console.log(slackID + ' reg to wait at Pole ' + poleNum)
	var waitPoleID = parseInt('600' + poleNum + '02')
	console.log('WaitPoleID: ' + waitPoleID)
	UpdateChargerLocationSlack(slackID, waitPoleID)

	request.post(
		responseUrl,
		{ json: {
		  "text": "You have been registered as waiting at Pole " + poleNum,
		  "attachments": [
			  {
				  "text":"You will be notified when a charger at Pole " + poleNum + " becomes available."
			  }
		  ]
	  } },
		function (error, response, body) {
			if (!error && response.statusCode == 200) {
				//console.log(body);
			}
		}
	);
});

module.exports = app;