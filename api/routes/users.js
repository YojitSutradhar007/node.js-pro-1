const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');// Use to store the user password in hash format 
const jwt = require('jsonwebtoken');
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
                    const jwtToken=jwt.sign({email:req.body.email},"secret",{expiresIn:"1h"});

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
                                result: result,
                                tooken: jwtToken
                            })
                        }).catch(error => {
                            res.status(404).send({ message: "User not Created" })
                        })

                }
            })

        }
    })
})


router.get('/', (req, res, next) => {
    User.find().select().exec().then(doc => {
        console.log(doc);
        const respone = {
            user: doc.length,
            UserList: doc.map(doc => {
                return {
                    email: doc.email,
                    password: doc.password,
                    id: doc._id,
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/user/" + doc._id
                    }
                }
            })
        }
        res.status(200).json(respone);
    }).catch(err => console.log(err));
});
module.exports = router;