const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');



router.post("/signup", (req, res, next) => {

    User.find({ email: req.body.email }).then(user => {
        console.log(user);
        if (user.length>0) {
             res.status(400).json({
                message: "Mail already exist"
            })

        } else {
            bcrypt.hash(req.body.password, 10, (error, hash) => {
                if (error) {
                    return res.status(500).send({
                        message: "Something went wrong`"
                    })
                }
                else {
                    const addUser = User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    });

                    console.log(addUser);
                    addUser.save()
                        .then(result => {
                            return res.status(201).json({
                                message: "User Created sucessfulty",
                                result: result
                            })
                        }).catch(error => {
                            res.status(404).send({ message: "User not Created" })
                        })

                }
            })

        }
    })



})



module.exports = router;