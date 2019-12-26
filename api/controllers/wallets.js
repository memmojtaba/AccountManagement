const Wallet = require('../models/wallet');
const Profile = require('../models/profile');

exports.wallets_get_wallet = (req, res, next) => {
    Profile.find({ 'email': req.email })
        .select('_id')
        .exec()
        .then(profile => {
            console.log('Profile: ' + profile[0]);
            if (profile) {
                Wallet.find({profileID: profile[0]._id})
                    .select('value')
                    .exec()
                    .then(val => {
                        console.log('Wallet value: ' + val[0]);
                        if (val){
                            res.status(200).json({
                                value: val[0].value
                            });
                        } else {
                            res.status(404).json({
                                message: 'Invalid Parameters.'
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({ message: 'Internal Server Error' });
                    });
            } else {
                res.status(404).json({
                    message: 'Invalid Parameters.'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Internal server error' });
        });
}