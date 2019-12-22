const express = require('express');
const router = express.Router();

const TransactionsController = require('../controllers/transactions');
const getRole = require('../middlewares/get-role');

router.get('/', getRole, TransactionsController.transactions_get_transaction);

module.exports = router;