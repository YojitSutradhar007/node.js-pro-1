const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.json());// show that which type of data in coming from body 
app.use(bodyParser.urlencoded({ extended: false }));


const productRouts = require('./api/routes/products');
const orderRouts = require('./api/routes/orders');
const user = require('./api/routes/users');


mongoose.connect('mongodb+srv://jimmysuthar08:jimmysuthar08@learningrest.rdlntht.mongodb.net/?retryWrites=true&w=majority');// connceting with mongodb
app.use(morgan('dev'));// showing that which type of request is called
app.use('/product', productRouts);
app.use('/order', orderRouts);
app.use('/user', user);


app.use((req, res, next) => {
    const error = new Error('not found');
    error.status = 404;
    next(error)
});
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    });
});
module.exports = app;