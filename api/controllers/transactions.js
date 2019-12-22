const mongoose = require('mongoose');

const Transaction = require('../models/transaction');

exports.transactions_get_transaction = (req, res, next) => {
    Transaction.find()
        .select('_id profileID createdAt modifiedAt amount orderID statusCode refID')
        .exec()
        .then(doc => {
            console.log('From database:' + doc);
            if (doc) {
                res.status(200).json(doc)
            } else {
                res.status(404).json({
                    message: 'Invalid parameters.'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Internal server error'
            });

        });
}