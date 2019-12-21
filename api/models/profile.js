const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true, //Not a validator but can use for readability
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true, minlength: 8 },
    name: String,
    phoneNo: String,
    nationalCode: String,
    address: String,
    postalCode: String
});

module.exports = mongoose.model('Profile', profileSchema);