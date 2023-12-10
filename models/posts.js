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

    comment:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }],

    likes :[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'like'
    }]

},{
    timestamps:true,
});

const  Post = mongoose.model('Post' , postScema);
module.exports = Post;