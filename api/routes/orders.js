const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Order = require("../models/order");
const Product = require("../models/product");

router.get('/', (req, res, next) => {

    Order.find().exec().then(doc => {
        console.log(doc);
        res.status(200).json({
            message: "GET method from order",
            data: doc
        });

    })

});

router.post('/', (req, res, next) => {
    Product.findById(req.body.product)
        .exec()
        .then(result => { 
            console.log(result); 
            const addOrder = new Order({
                _id: new mongoose.Types.ObjectId(),
                product: req.body.product,
                quantity: req.body.quantity
            });
            addOrder.save()
                .then(result => {
                    console.log(result);
                    res.status(201).json({
                        message: "POST method from order",
                        order: result
                    })
        
                });
        })
        .catch(error => {
            res.status(400).json({
                message: "Product doesn't exist"
            })
        });  
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    if (id == "special") {
        res.status(200).json({
            message: "You find special Id Code in order"
        });
    } else {

        res.status(200).json({
            message: "order Id"
        });
    }

});


module.exports = router;