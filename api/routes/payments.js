const express = require('express');
const router = express.Router();


const PaymentsController = require('../controllers/payments');
const TransactionController = require('../controllers/transactions');
const getRole = require('../middlewares/get-role');
const paymentRequest = require('../middlewares/payment-request');
const paymentVerify = require('../middlewares/payment-verify');

router.post('/', getRole, TransactionController.transactions_insert_transaction, paymentRequest,
    PaymentsController.payments_zarinpal_payment);
router.get('/callback/:transactionID', paymentVerify,
    TransactionController.transactions_update_transaction,
    PaymentsController.payments_callback_payment);

module.exports = router;