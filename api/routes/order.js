const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "GET method from order"
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: "POST method from order"
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