const express = require('express');
const routes  = express.Router()
const home_controller = require('../controllers/home_controller');

routes.get('/' , home_controller.home);
routes.use('/posts' , require('./posts'));
routes.use('/users',  require('./users'))
routes.use('/comments',require('./comments'))
routes.use('/likes',require('./like'))
module.exports = routes;