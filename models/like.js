const mongoose = require('mongoose');

const like = mongoose.Schema({
    user :{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },

    likable:{
        type:mongoose.Schema.Types.ObjectId,
        refPath:'onmodel',
        required:true
    },
    onmodle:{
        type:String,
        enum:['post','comment'],
        required:true
    }
})

module.exports = mongoose.model('like',like);
