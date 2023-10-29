const Post = require('../models/post')


module.exports.create = function(req,res){
    const createNewPost = async function(){
        const newpost = await new Post({content : req.body.content , user:req.user._id});
        newpost.save();
    }  
    createNewPost();
    res.redirect('back')
}