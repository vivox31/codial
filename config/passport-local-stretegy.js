const passport = require('passport');
const LocalStretegy = require('passport-local').Strategy;
const User = require('../models/users');
passport.initialize();

passport.use(new LocalStretegy({
    usernameField: 'email'
},
    function (email, password, done) {
      
        User.findOne({email : email}).then((user)=>{
            if (!user || user.password != password) {
                        console.log('incorrect username/password');
                        return done(null, false);
                    }
        
                    return done(null, user);
        }).catch((err)=>{
            console.log('error in finding the user!!---> passport');
            return done(err)
        })
    }));


passport.serializeUser(function (user, done) {
    done(null, user.id);
})

passport.deserializeUser(function (id, done) {
  
    User.findById(id).then((user)=>{
        return done(null , user);
    }).catch((err) =>{
        return done(err);
    })
})


passport.checkAuthentication = function(req, res , next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/sign-in');
}


passport.setAuthenticatedUser = function (req, res, next){
    if(req.isAuthenticated()){
        // req.user contains current user from session keys and we are sending this users to local views
        res.locals.user  = req.user;   
    }
    
    next();
}

module.exports = passport;