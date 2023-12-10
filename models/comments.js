const mongoose = require('mongoose')

const commentScema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'Post'
    },
    likes :[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'like'
    }]
},{
    timestamps:true
})

const Comment = mongoose.model('Comment', commentScema);
module.exports = Comment