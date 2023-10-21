const express = require('express');
const routes  = express.Router()
const home_controller = require('../controllers/home_controller');

routes.get('/' , home_controller.home);
routes.use('/users',  require('./users'))
module.exports = routes;