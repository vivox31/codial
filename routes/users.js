const express = require('express');
const routes = express.Router();
const users_controller = require('../controllers/users_controller')

routes.get('/profile' , users_controller.profile);
routes.get('/sign-up' , users_controller.sign_up);
routes.get('/sign-in' , users_controller.sign_in);
routes.post('/create' , users_controller.create);
routes.post('/users/create-session' , users_controller.create_session)
module.exports = routes











// (req, res)=>{
//     console.log(req.body);
//     res.redirect('back')
// });