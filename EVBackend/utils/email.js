var nodemailer = require('nodemailer');

const notifyAvailable = (emailUser) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'evnotifs.noreply@gmail.com',
          pass: 'evnotifs123'
        }
      });
      var mailOptions = {
        from: 'evnotifs.noreply@gmail.com',
        to: emailUser,
        subject: 'Charger available!',
        text: 'Charger available for your car!'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

const notifyComplete = (emailUser) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'evnotifs.noreply@gmail.com',
          pass: 'evnotifs123'
        }
      });
      var mailOptions = {
        from: 'evnotifs.noreply@gmail.com',
        to: emailUser,
        subject: 'Charging complete!',
        text: 'Your car has finished charging.'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

const notifyPotential = (emailUser) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'evnotifs.noreply@gmail.com',
          pass: 'evnotifs123'
        }
      });
      var mailOptions = {
        from: 'evnotifs.noreply@gmail.com',
        to: emailUser,
        subject: 'Charger available!',
        text: 'Your car should be charging right now. Please check.'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}
module.exports = {
    notifyAvailable : notifyAvailable,
    notifyComplete : notifyComplete,
    notifyPotential : notifyPotential
}