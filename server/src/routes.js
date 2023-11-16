const express = require('express');
const passport = require("passport")
const jwt = require("jsonwebtoken")
require('dotenv').config();
/**
 * Express Router to handle authentication routes.
 * @type {import('express').Router}
 */
const router = express.Router();

/**
 * POST /login route.
 * Uses Passport to authenticate the user (local strategy by default).
 * If authentication is successful, a JWT is signed and sent as a cookie.
 * The JWT payload contains the user's ID and expires in 1 hour.
 */
router.post(process.env.LOGIN_ENDPOINT, passport.authenticate('local', { session: false}), ({user: {username, id}}, res) => {
    jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) {
            return res.status(500).json({ error: 'Error signing token', raw: err });
        }
        res.cookie('token', token, { httpOnly: true });
        res.json({username, id});
    });
});

/**
 * GET /verify-token route.
 * Extracts the JWT from the 'token' cookie.
 * If the token is not found, returns a 401 Unauthorized response.
 * If the token is found, verifies it using the secret key.
 * If verification is successful, returns the decoded payload.
 * If verification fails, returns a 401 Unauthorized response.
 */
router.get(process.env.VERIFY_TOKEN_ENDPOINT, (req, res) => {
    const token = req.cookies['token'];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }
        res.json(decoded);
    });
});

/**
 * POST /logout route.
 * Clears the 'token' cookie to log out the user.
 */
router.post(process.env.LOGOUT_ENDPOINT, (req, res) => {
    res.clearCookie('token');
    res.json({ success: true });
});

module.exports = router;