const express = require('express')
const  routes = express.Router();
const post_controller = require('../controllers/post_controller');
const passport = require('passport');

routes.post('/create' ,passport.checkAuthentication, post_controller.create);

module.exports = routes;