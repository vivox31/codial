const passport = require('passport')
const passportJWT = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/users');

let opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'codial'
}

passport.use(new passportJWT(opts,function(jwtpayload,done){

    User.findById(jwtpayload._id).then((user)=>{
        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }
    }).catch((err)=>{
        console.log(err);
        return;
    })
        
    
}));
module.exports = passport;