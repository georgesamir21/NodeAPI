const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser').urlencoded({extended: true});
// const bcrypt = require('bcrypt');
// const multer = require('multer');
// const multerFileUpload = multer();
const secretKey = '5,mhhv@o$7jn&';
const validator = require('validator');


router.post('/login', bodyParser, (request, response)=>{
    // if phone is not sent el server bydrab need to solve it...
    if(validator.isMobilePhone(request.body.phone_number, 'any') && request.body.password) {
        let payLoad = {
            phone_number: request.body.phone_number
        };
        jwt.sign(payLoad, secretKey, (err, token)=>{
            if(!err){
                let responseMsg = {
                    succes: true,
                    message: 'Authentication Success!',
                    token: token
                };
                response.json(responseMsg);
            }
        });
    } else {
        let responseMsg = {
            succes: false,
            message: 'Authentication Failed!',
            error: 'bad password or phone_number'
        };
        response.json(responseMsg);
    }
    
});

// router.post('/home', verifyAuthToken, (request, response)=>{
//     jwt.verify(request.token, secretKey, (err, payLoad)=>{
//         if(err){
//             response.sendStatus(401);
//         } else {
//             response.json({
//                 message: "HOME PAGE",
//                 data: payLoad
//             });
//         }
//     });   
// });

module.exports = {
    router,
    secretKey
};