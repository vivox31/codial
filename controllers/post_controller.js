const Post = require('../models/posts');
const Comment = require('../models/comments')

module.exports.create = function(req,res){
    const createNewPost = async function(){
        const newpost = await new Post({content : req.body.content , user:req.user._id});
        newpost.save();
        
    }  
    createNewPost();
    res.redirect('back')
}

module.exports.destroy = async function(req,res){

   let post = await Post.findById(req.params.id)
        if(post.user == req.user.id){

           await post.deleteOne();
           await Comment.deleteMany({post:req.params.id})
            res.redirect('back')
            
        }else{
            res.redirect('back')
        }
    
    
}