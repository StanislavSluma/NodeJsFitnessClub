const express = require('express');
const router = express.Router();
const passport = require('passport');
const AuthController = require('../controllers/AuthController');
const Role = require('../models/Role');
const {sign} = require("jsonwebtoken");

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY;

router.post('/register', AuthController.Register);
router.post('/login', AuthController.Login);

router.get('/profile', AuthController.Profile);

router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: 'http://localhost:5173/login',
}), async (req, res) => {

    const user = req.user;
    console.log(user);

    const accessToken = sign(
        { id: user._id, role: 'client' },
        accessTokenSecret,
        { expiresIn: accessTokenExpiry }
    );

    res.cookie('access', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000,
        path: '/',
        SameSite: 'None'
    });

    res.redirect('http://localhost:5173/home');
});

module.exports = router;