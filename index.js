const express = require('express');
const cookieParser = require('cookie-parser')
const db = require('./config/mongoose');
const passport = require('passport')
const LocalStretegy = require('./config/passport-local-stretegy')
const session = require('express-session');
const port = 8000;

const app = express();
app.use(express.urlencoded());
app.use(cookieParser());

app.set('view engine' , 'ejs')
app.set('views' , './views' )

app.use(session({
    name:'codeial',
    // TODO change secrete key before deployement
    secret:'vishal',
    saveUninitialized:false,
    resave:false,

    cookie : {
        maxAge:(1000*60*100),

    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/' , require('./routes/index'));


app.listen(port ,function(err){
    if(err){
        console.log(`error while connecting to server : ${err}`);
    }
    console.log(`server is running successfully on : ${port}`);
})