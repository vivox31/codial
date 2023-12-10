const express = require('express');
const cookieParser = require('cookie-parser')
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport')
const passportLocal = require('./config/passport-local-stretegy')
const passportJWT = require('./config/passport-jwt-stretegy')
const passportGoogle = require('./config/passport-google-outh2-stretegy');
const routes = require('./routes/index')
const MongoStore = require('connect-mongo')
const ejsLayout = require('express-ejs-layouts');
const sassMiddleware = require('node-sass-middleware');
const path = require('path')
const flash = require('connect-flash')
const customMware = require('./config/middleware')
const port = 8000;
const app = express();

// setting up scss middleware
app.use(sassMiddleware({
    src : './assets/scss',
    dest : './assets/css',
    debug: true,
    outputStyle:'expanded',
    prefix:'/css',
    
}));

app.use(express.urlencoded());
app.use(cookieParser());


// setting up view engine
app.set('view engine' , 'ejs')
app.set('views' , './views' )
app.use(express.static('./assets'));
app.use(ejsLayout);
app.set('layout' , 'layout.ejs')
app.set("layout extractScripts", true)
app.use('/uploads',express.static(__dirname + '/uploads'));

// seeting up session middle ware
app.use(session({
    name:'codeial',
    // TODO change secrete key before deployement
    secret:'vishal',
    saveUninitialized:false,
    resave:false,
    cookie : {
        maxAge:(1000*60*100*5),
    },
    store:   MongoStore.create({
        mongoUrl: "mongodb://127.0.0.1:27017/User",
        // mongoOptions: advancedOptions // See below for details
      })
})
);


app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser)
app.use(flash());
app.use(customMware.setflash);
app.use('/',routes);
app.use('/api',require('./routes/api/index'));






app.listen(port ,function(err){
    if(err){
        console.log(`error while connecting to server : ${err}`);
    }
    console.log(`server is running successfully on : ${port}`);
})