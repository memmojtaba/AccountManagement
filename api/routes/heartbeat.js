const express = require('express');
const router = express.Router();
const http = require('http');

const checkAuth = require('../middlewares/check-auth');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Account Management is up and running...'
    });
});

module.exports = router;