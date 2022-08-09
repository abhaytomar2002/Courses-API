//npm
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();
const Users = require("../model/userModel");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


app.use(bodyParser.urlencoded({ extended: true }));

//setting up signup page for authentication
router.post("/signup", (req, res, next) => {
    Users.find({ email: req.body.email })//checking if the email already exits 
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "User exists."
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new Users({//signing up as user is new
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: "User created"
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
        });
});

//Setting up login route
router.post("/login", (req, res, next) => {
    Users.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }
                if (result) {
                    //authorisation check
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    },
                    process.env.JWT_KEY, 
                    {
                        expiresIn: "1h" 
                    });
                    return res.status(200).json({
                        message: "Successfully auth",
                        token: token
                    });
                }
                return res.status(401).json({
                    message: "Auth failed"
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
})

//deleting any user id
router.delete("/:userId", (req, res, next) => {
    Users.remove({ _id: req.params.id })
        .exec()
        .then(res => {
            res.status(200).json({
                message: "User deleted."
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;
