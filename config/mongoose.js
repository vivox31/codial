const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/User").then(()=>{
   
}).catch(()=>{
    console.log("failed to connect to db")
})
const db = mongoose.connection;
db.once('open' ,()=>{
    console.log('connected to mongo database');
} )
module.exports = db;