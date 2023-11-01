const express = require('express');
const routes = express.Router();
const passport = require('passport');
const users_controller = require('../controllers/users_controller');


routes.get('/profile/:id',passport.checkAuthentication, users_controller.profile);
routes.get('/sign-up', users_controller.sign_up);
routes.get('/sign-in', users_controller.sign_in);
routes.post('/create', users_controller.create);
routes.post('/create-session',passport.authenticate('local',{failureRedirect: '/users/sign-up', }), users_controller.create_session);
routes.get('/sign-out' , users_controller.destroySession);

    
module.exports = routes







