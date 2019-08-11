const ping = require('./ping.js')
const fs = require('fs')
var request = require('request');
const email = require('./utils/email')
const slack = require('./utils/slack')
const express = require('express');
const router = express.Router();
// Load User model
const User = require('../models/User.js');


function UpdateChargerLocation (emails, id) {

    User.findOne({email: emails}).then(user => {

        var newvalues = { $set: {ChargerLocation: id} }

        User.updateOne(user, newvalues, function(err,res){
            if (err) {
                throw err;
            }
            else {
                console.log("poleID updated");
            }
        });
    });
}

function UpdateChargerLocationSlack (slackID, poleID) {
    User.findOne({slackID: slackID}).then(user => {
  
        var newvalues = { $set: {ChargerLocation: poleID} }
  
        if (user) {
            console.log('user already exists')
            User.updateOne(user, newvalues, function(err,res){
              if (err) {
                  throw err;
              } else {
                  console.log("poleID updated to " + poleID);
              }
            });
        } else {
            console.log('Creating new user')
            const newUser = new User({
              poleID,
              slackID
            });
            newUser.save()
            .then(user => {
               console.log("New user created with poleID " + poleID);
            }).catch(err => console.log(err));
        }
    });
  }

function GetUser(id, callback){
    User.findOne({ChargerLocation: id}).then(user => {
        let emailID = user.email
        callback(emailID)
    }).catch(function (err) {
        // rejected
        console.log(err)
    });
}

function GetUserSlack(id, callback){
    User.findOne({ChargerLocation: id}).then(user => {
        let slackID = user.slackID
        callback(slackID)
    }).catch(function (err) {
        // rejected
        console.log(err)
    });
}

setInterval(function(){
    ping ((array) => {

        console.log('LOOP')

        // Read old array as object from data.json
        var oldArray = fs.readFileSync('data.json')
    
        // Write new array as object to data.json    
        var oldJSON = JSON.parse(oldArray)
        var newJSON = array

        // Comment below line for testing
        fs.writeFileSync('data.json', JSON.stringify(array))

        console.log(JSON.stringify(oldJSON) === JSON.stringify(newJSON))
    
        for (let i = 0; i < newJSON.length; i++){
    
            if((JSON.stringify(oldJSON[i].busy)) !== (JSON.stringify(newJSON[i].busy))){
                var today = new Date();
                var time = today.getUTCHours()
                let poleID = newJSON[i].id    
                let busy = newJSON[i].busy

                let side = 'right'
                let poleIDString = poleID.toString()
                let sideNum = poleIDString.substring(poleIDString.length-1)
                if(sideNum === '1'){
                    side = "left"
                }

                let evnum = ''
                let poleString = poleID.toString()
                evnum = poleString.substring(2,4)

                // Busy -> Free
                if (busy === "No"){
                    // Email to person who completed charging
                    GetUser(poleID, emailID => {
                        if(emailID){
                            email.notifyComplete(emailID)
                            UpdateChargerLocation(emailID, 100000)
                        }
                    })

                    GetUserSlack(poleID, slackID => {
                        if(slackID){
                            console.log(slackID)
                            slack.notifyComplete(slackID)
                            UpdateChargerLocationSlack(slackID, 100000)
                        }else{
                            console.log('nO id to send slackComplete')
                        }
                    })

                    // -------------------------------------------------------------------------------------------

                    // Email to person who was waiting
                    let waitingPoleID = poleID.toString()
                    waitingPoleID = parseInt((waitingPoleID.substring(0, waitingPoleID.length - 1)) + '2')
                    console.log('WID: ', waitingPoleID)

                    // GetUser(waitingPoleID, emailID => {
                    //     if(emailID){
                    //         email.notifyAvailable(emailID)
                    //     }     
                    // })

                    GetUserSlack(waitingPoleID, slackID => {
                        if(slackID){
                            console.log('Got slack ID')
                            slack.notifyAvailable(slackID)
                        } else {
                            console.log('No Slack ID')
                        }
                    })

                    // -----------------------------------------------------------------------------

                    // Slack message that charge is complete
                    console.log('About to send slack complete')
                    if(time <= 1 || time >= 14){
                        console.log('Inside complete' + time)
                        slackComplete(evnum, side)
                    }else{
                        console.log(time)
                    }

                }else{
                    
                    let waitingPoleID = poleID.toString()
                    waitingPoleID = parseInt(waitingPoleID.substring(0, waitingPoleID.length - 1) + '2')

                    GetUser(waitingPoleID, emailID => {
                        if(emailID){
                            UpdateChargerLocation(emailID, waitingPoleID)
                            email.notifyPotential(emailID)
                        }
                    })

                    GetUserSlack(waitingPoleID, slackID => {
                        if(slackID){
                            console.log('Inside hereeee')
                            UpdateChargerLocationSlack(slackID, waitingPoleID)
                            slack.notifyPotential(slackID)
                        }
                    })

                    if(time <= 1 || time >= 14){
                        console.log('Inside' + time)
                        slackCharging(evnum, side)
                    } else {
                        console.log(time)
                    }
                }
            }
        }
    })
}, 60000);



const slackComplete = (evnum, side) => {

    var mean_ev_notify_test_url = 'https://hooks.slack.com/services/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'
    var ev_charger_mobile_ibm_url = 'https://hooks.slack.com/services/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'
    var svl_ev_ibm_url = 'https://hooks.slack.com/services/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'

    // IBM Real Channel: https://hooks.slack.com/services/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
    // IBM Test Channel: https://hooks.slack.com/services/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
    // Demo Workspace:   https://hooks.slack.com/services/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
    

    request.post(
        svl_ev_ibm_url,
        { json: { text: 'SVL: EV' + evnum + ', ' + side + ' side is now completed/stopped. ' } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            } else {
                console.log(error)
            }
        }
    )
}

const slackCharging = (evnum, side) => {

    var mean_ev_notify_test_url = 'https://hooks.slack.com/services/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'
    var ev_charger_mobile_ibm_url = 'https://hooks.slack.com/services/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'
    var svl_ev_ibm_url = 'https://hooks.slack.com/services/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'

    // IBM Real Channel: https://hooks.slack.com/services/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
    // IBM Test Channel: https://hooks.slack.com/services/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
    // Demo Workspace:   https://hooks.slack.com/services/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

    request.post(
        svl_ev_ibm_url,
        { json: { text: 'SVL: EV' + evnum + ', ' + side + ' side is now in use. ' } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            } else {
                console.log(error)
            }
        }
    )
}

module.exports = router