const express = require('express')
const routes = express.Router()
const comment_controller = require('../controllers/comment_controller');
const passport = require('passport');

routes.post('/create' , comment_controller.create);
routes.get('/destroy/:id' , passport.checkAuthentication , comment_controller.destroy);
module.exports = routes;