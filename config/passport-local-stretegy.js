const passport = require('passport');
const LocalStretegy = require('passport-local').Strategy;
const User = require('../models/users');

passport.use(new LocalStretegy({
    usernameField: 'email'
},
    function (email, password, done) {

        // find user and stablish the identity
        const findUser = async () => {
            const user = await User.findOne({ email: email }).catch((err) => {
                console.log('error in finding user ---> passport')
                return done(err)
            });

            if (!user || user.password != password) {
                console.log('incorrect username/password');
                return done(null, false);
            }

            return done(null, user);

        }

        findUser();
    }))


passport.serializeUser(function (user, done) {
    done(null, user.id);
})

passport.deserializeUser(function (id, done) {
    const matchid = async () => {
        const user = await User.findById(id).catch((err)=>{
            console.log('error in finding id ---->passport')
            return done(err)
        })

        return done(null,user)

    }
})


module.exports = passport;