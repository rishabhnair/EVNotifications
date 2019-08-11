const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/api/ev', forwardAuthenticated, (req, res) => res.render('../views/EVBackend/angular/index.html'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('../views/EVBackend/angular/index.html', {
    user: req.user
  })
);

module.exports = router;
