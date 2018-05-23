const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const autoIncrement = require('mongoose-auto-increment');
const connection = mongoose.createConnection("mongodb://localhost/cognitev");
autoIncrement.initialize(connection);
mongoose.connect("mongodb://localhost/cognitev");

const usersController = require('./controllers/users');
const loginController = require('./controllers/login').router;
const getStatusController = require('./controllers/getStatus');

const server = express();

server.use('/users', usersController);
server.use('/users', loginController);
server.use('/home', getStatusController);


server.listen(9090, ()=>{
    console.log("Server is on localhost:9090");
});

