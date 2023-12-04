const passport = require('passport')
const googleStretegy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/users');


passport.use(new googleStretegy({
    clientID: "547160134286-un5s4469vebq98h9ntmqobbvd97d517f.apps.googleusercontent.com",
    clientSecret : "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",
    callbackURL: "http://localhost:8000/users/Auth/google/callback"
},
    function(accesstoken,refreshtoken,profile,done){
        User.findOne({email : profile.emails[0].value}).then((user)=>{
           
            console.log(profile);
            if(user){
                return done(null,user)
            }else{
                const user =  new User({
                    name:profile.displayName,
                    email : profile.emails[0].value,
                    password : '1234'
                })
                user.save();
                return done(null,user);
            }


        }).catch((err)=>{
            {
                if(err){
                    console.log("error in signing user with google auth",err);
                    return;
                }
            }
        })
    }
))