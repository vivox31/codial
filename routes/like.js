const express = require('express')
const routes = express.Router()

likeController = require('../controllers/likes_controller');

routes.get('/toggle',likeController.toggleLike)

module.exports = routes;