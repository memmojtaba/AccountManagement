const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const heartbeatRoutes = require('./api/routes/heartbeat');
const profileRoutes = require('./api/routes/profiles');
const walletRoutes = require('./api/routes/wallets');
const transactionRoutes = require('./api/routes/transactions');
const paymentRoutes = require('./api/routes/payments');

//Logging middleware
app.use(morgan('dev'));

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Preventing CORS (Cross-Origin Resource Sharing) errors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTOINS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//Routes which should handle requests
app.use('/account/heartbeat', heartbeatRoutes);
app.use('/account/profile', profileRoutes);
app.use('/account/wallet', walletRoutes);
app.use('/account/transaction', transactionRoutes);
app.use('/account/pay', paymentRoutes);

//Connect to MongoDB with mongoose
if (env.process.DB_USER && env.process.DB_PASS){
    const connectionString = 'mongodb://' + env.process.DB_USER + ':' + env.process.DB_PASS +
        '@' + (process.env.MONGO_SERVER_ADDR || 'mongo') + ':' +
        (process.env.MONGO_SERVER_PORT || '27017') + '/account'
    mongoose.connect(connectionString,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        // useMongoClient: true
    })
    .catch(err => {
        res.status(500).json({
            message: 'Internal Server Error'
        })
    })
    
    mongoose.Promise = global.Promise;
    console.log(connectionString);
} else{
    const connectionString = 'mongodb://' + (process.env.MONGO_SERVER_ADDR || 'mongo') + ':' +
    (process.env.MONGO_SERVER_PORT || '27017') + '/account'
    mongoose.connect(connectionString,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        // useMongoClient: true
    })
    .catch(err => {
        res.status(500).json({
            message: 'Internal Server Error'
        })
    })
    
    mongoose.Promise = global.Promise;
    console.log(connectionString);
}

//Error handling
app.use((req, res, next) => {
    const error = Error('Not found!');
    error.status = 404
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;