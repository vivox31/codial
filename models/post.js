const mongoose = require('mongoose');

const postScema = new mongoose.Schema({
    content:{
        type:String,
        required:true,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
             ref: 'User'
    },

},{
    timestamps:true,
});

const  Post = mongoose.model('post' , postScema);
module.exports = Post;