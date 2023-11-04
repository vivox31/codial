const Post = require('../models/posts');
const Comment = require('../models/comments')

module.exports.create = function(req,res){
    const createNewPost = async function(){
        const newpost = await new Post({content : req.body.content , user:req.user._id});
        newpost.save();
        
    }  
    createNewPost();
    req.flash('success', 'post created')
    res.redirect('back')
}

module.exports.destroy = async function(req,res){

   let post = await Post.findById(req.params.id)
        if(post.user == req.user.id){

           await post.deleteOne();
           await Comment.deleteMany({post:req.params.id})
           req.flash('success' , 'post deleted')
            res.redirect('back')
            
        }else{
            req.flash('error', "you can't delete this post!!")
            res.redirect('back')
        }
    
    
}