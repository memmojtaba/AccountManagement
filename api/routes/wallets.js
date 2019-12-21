const express = require('express');
const router = express.Router();

const WalletsController = require('../controllers/wallets');
const getRole = require('../middlewares/get-role');

router.get('/', getRole, WalletsController.wallets_get_wallet);

module.exports = router;