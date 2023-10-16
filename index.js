const express = require('express');
const cookieParser = require('cookie-parser')
const port = 8000;

const app = express();
app.use(cookieParser());
app.use('/' , require('./routes/index'));
app.set('view engine' , 'ejs')
app.set('views' , './views' )
app.listen(port ,function(err){
    if(err){
        console.log(`error while connecting to server : ${err}`);
    }
    console.log(`server is running successfully on : ${port}`);
})