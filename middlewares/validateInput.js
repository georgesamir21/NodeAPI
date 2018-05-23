// const express = require('express');
// const router = express.Router();
const path = require('path');
//const bodyParser = require('body-parser').urlencoded({extended: true});
const multer = require('multer');
const validator = require('validator');

// const usersModel = require('../models/users');

const validateInput = (request, response, next)=> {
    console.log(request.body);
    const acceptableFileExtensions = ['.jpg', '.jpeg', '.png'];
    const gender = ['male', 'female'];
    const dateRegex = /^(19|20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/;
    let todayDate = new Date().toString();
    let errorMessage = {errors:{}};
    let dataIsValid = true;

    if(!request.body.first_name) {
        errorMessage.errors.first_name = {error: 'blank'};
        dataIsValid = false;
    }

    if(!request.body.last_name) {
        errorMessage.errors.last_name = {error: 'blank'};
        dataIsValid = false;
    }

    if(!request.body.country_code) {
        errorMessage.errors.country_code = {error: 'blank'};
        dataIsValid = false;
    }

    if(!request.file) {
        errorMessage.errors.avatar = {error: 'blank'};
        dataIsValid = false;
    } else if(!acceptableFileExtensions.includes(path.extname(request.file.originalname))) {
        errorMessage.errors.avatar = {error: 'invalid content type'};
        dataIsValid = false;
    }

    if(!request.body.phone_number) {
        errorMessage.errors.phone_number = {error: 'blank'};
        dataIsValid = false;
    } else if(isNaN(Number(request.body.phone_number))) {
        errorMessage.errors.phone_number = {error: 'not a number'};
        dataIsValid = false;
    } else if(request.body.phone_number.length <= 10) {
        errorMessage.errors.phone_number = {error: 'too short', count: request.body.phone_number.length};
        dataIsValid = false;
    } else if(request.body.phone_number.length >= 15) {
        errorMessage.errors.phone_number = {error: 'too long', count: request.body.phone_number.length};
        dataIsValid = false;
    } else if(!validator.isMobilePhone(request.body.phone_number, 'any')) {
        //need to check a regex....
        errorMessage.errors.phone_number = {error: 'invalid'};
        dataIsValid = false;
    } /*else if (isTaken = usersModel.isPhoneNumberTaken(request.body.phone_number)) {
        errorMessage.errors.phone_number = {error: 'taken'};
        dataIsValid = false;
    }*/

    if(!gender.includes(request.body.gender)) {
        errorMessage.errors.gender = {error: 'inclusion'};
        dataIsValid = false;
    }

    if(/*!dateRegex.test*/(!request.body.birthdate)) {
        errorMessage.errors.birthdate = {error: 'blank'};
        dataIsValid = false;
    } else if(!validator.isBefore(request.body.birthdate, todayDate)) {
        errorMessage.errors.birthdate = {error: 'date in the future'};
        dataIsValid = false;
    }

    if(request.body.email) {
        if(!validator.isEmail(request.body.email)) {
            errorMessage.errors.email = {error: 'invalid'};
            dataIsValid = false;
        }
    }

    if(dataIsValid) {
        next();
    } else {
        response.json(errorMessage);
    }
}

module.exports = validateInput;