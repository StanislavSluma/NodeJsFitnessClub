const express = require('express');
const router = express.Router();
const passport = require('passport');
const AuthController = require('../controllers/AuthController');

router.post('/register', AuthController.Register);
router.post('/login', AuthController.Login);

router.get('/profile', AuthController.Profile);

router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/google/callback', passport.authenticate('google', {
    successRedirect: 'http://localhost:5173/home',
    failureRedirect: 'http://localhost:5173/login',
}));

module.exports = router;