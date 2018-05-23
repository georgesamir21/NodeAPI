const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const usersModel = require('../models/users');
const verifyAuthToken = require('../middlewares/verifyAuthToken');
const secretKey = require('./login').secretKey;

router.post('/', verifyAuthToken, (request, response)=> {
    jwt.verify(request.token, secretKey, (err, payLoad)=> {
        if(err) {
            response.sendStatus(401);
        } else {
            usersModel.findUserByPhoneNumber(payLoad.phone_number).then((user)=>{
                response.json({
                    message: "HOME PAGE",
                    data: user
                });
            }).catch((err)=>{
                response.sendStatus(401);
            });
        }
    });   
});

module.exports = router;
