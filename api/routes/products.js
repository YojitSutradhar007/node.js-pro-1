const express = require('express');
const Products = require('../models/product');
const mongoose = require('mongoose');
const router = express();

router.get('/', (req, res, next) => {
    Products.find().select("name price _id").exec().then(doc => {
        console.log(doc);
        const respone = {
            count: doc.length,
            productItem: doc.map(doc => {
                return {
                    name: doc.name,
                    price: doc.price,
                    id: doc._id,
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/product/" + doc._id
                    }
                }
            })
        }
        res.status(200).json(respone);
    }).catch(err => console.log(err));
});
 
router.post('/', (req, res, next) => {
    const addProduct = new Products({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    addProduct.save().then(result => {
        console.log(result);
    }).catch(err => console.log(err));

    res.status(201).json({
        message: "Create Product Scucessfully",
        createProduct: {
            name:addProduct.name,
            price:addProduct.price,
            id:addProduct.id,
            request:{
                type:"GET",
                url:"http://localhost:3000/product/" + addProduct._id
            }
        }
    });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Products.findById(id).
        exec().
        then(doc => {
            console.log("FROM database " + doc);
            res.status(200).json(doc);

        }).catch(err => console.log(err));

});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Products.deleteOne({ _id: id }).
        exec().
        then(result => {
            console.log("FROM database " + result);
            res.status(200).json(result);

        }).catch(err => console.log(err));
});



module.exports = router;