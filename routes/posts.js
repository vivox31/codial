const express = require('express')
const  routes = express.Router();
const post_controller = require('../controllers/post_controller');
routes.post('/create' , post_controller.create);

module.exports = routes;