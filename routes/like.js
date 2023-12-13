const express = require('express')
const routes = express.Router()

const likeController = require('../controllers/likes_controller');

routes.post('/toggle',likeController.toggleLike)

module.exports = routes;