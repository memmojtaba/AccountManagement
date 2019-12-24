const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Account Management is up and running...'
    });
});

module.exports = router;