const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const heartbeatRoutes = require('./api/routes/heartbeat');
const profileRoutes = require('./api/routes/profiles');

//Logging middleware
app.use(morgan('dev'));

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Preventing CORS errors
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

//Connect to MongoDB with mongoose
const connectionString = 'mongodb://' + (process.env.MONGO_SERVER_ADDR || 'mongo') + ':' +
    (process.env.MONGO_SERVER_PORT || '27017') + '/account'
mongoose.connect(connectionString,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        // useMongoClient: true
    }
);
mongoose.Promise = global.Promise;
console.log(connectionString);
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