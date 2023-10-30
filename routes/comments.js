const express = require('express')
const routes = express.Router()
const comment_controller = require('../controllers/comment_controller')

routes.post('/create' , comment_controller.create);

module.exports = routes;