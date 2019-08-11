const express = require('express');
const router = express.Router();
// Load User model
const User = require('../models/User.js');

var undef = undefined


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

  function GetUser(id, callback){
    User.findOne({ChargerLocation: id}).then(user => {
        console.log('HERE')
        let emailID = user.email
        callback(emailID)
    }).catch(function (err) {
        // rejected
        console.log('errorGU')
    });


 }

module.exports = {
    GetUser : GetUser,
    UpdateChargerLocation : UpdateChargerLocation,    
}

module.exports = router

