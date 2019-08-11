var request = require('request');

// EV-Notify (Test) Token
//var token = "xoxb-710349530212-718981928692-FtsD0MmYMjWQkoFBV1zYyGBc"

// IBM Data & AI Token
var token = "xoxb-8709467270-709638091843-jLvccca2pqQsSYCvdL3xBypy"

channelID = 'CLKC1MPLJ'
var messageUrl = "https://slack.com/api/chat.postMessage"

const notifyAvailable = (slackID) => {
    console.log(token)

	var messageID = ''
	
	var data = {form: {
		token: token,
		channel: slackID,
		text: "Charger available for your car!"
	}};

	request.post('https://slack.com/api/chat.postMessage', data, function (error, response, body) {
		// Sends welcome message
	});
}

const notifyComplete = (slackID) => {

	var data = {form: {
		token: token,
		channel: slackID,
		text: "Your car has finished charging."
	}};

	request.post('https://slack.com/api/chat.postMessage', data, function (error, response, body) {
		// Sends welcome message
	});
}

const notifyPotential = (slackID) => {
    request.post(
		'https://slack.com/api/chat.postMessage',
		{ json: {
            "token" : token,
            "channel": slackID,
		    "text": "Your car should be charging right now. Please check."
	  } },
		function (error, response, body) {
			if (!error && response.statusCode == 200) {
				//console.log(body);
			}
		}
	);
}

module.exports = {
    notifyAvailable : notifyAvailable,
    notifyComplete : notifyComplete,
    notifyPotential : notifyPotential
}