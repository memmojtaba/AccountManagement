const mongoose = require('mongoose');

const Transaction = require('../models/transaction');
const Profile = require('../models/profile');

exports.transactions_get_transaction = (req, res, next) => {
    Profile.find({ 'email': req.email })
        .select('_id')
        .exec()
        .then(doc => {
            console.log('Found From profile: ' + doc[0]);
            if (doc) {
                Transaction.find({profileID: doc[0]._id})
                    .select('_id profileID createdAt modifiedAt amount orderID statusCode refID')
                    .exec()
                    .then(transactions => {
                        console.log('Found From transaction: ' + transactions);
                        if (transactions){
                            res.status(200).json(transactions);
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