const express = require('express');
const router = express.Router();
//const path = require('path');

const multer = require('multer');
const validator = require('validator');

const usersModel = require('../models/users');

const validateInput = require('../middlewares/validateInput');

const multerFileUpload = multer();

router.post('/add', multerFileUpload.single('avatar'), validateInput, (request, response)=> {
    request.body.country_code = request.body.country_code.toUpperCase();
    let userData = request.body;
    userData.avatar = "data:image/jpeg;base64,".concat(request.file.buffer.toString('base64'))
    
    usersModel.createNewUser(userData, (err, doc)=> {
        if(!err) {
            response.statusCode = 201;
            response.json(doc);
        } else {
            response.json(err);
        }
    });
});

module.exports = router;
