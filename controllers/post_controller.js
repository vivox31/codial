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

module.exports.destroy = function(req,res){
    Post.findById(req.params.id).then((post)=>{
        if(post.user == req.user.id){
            post.deleteOne().then(()=>{
                Comment.deleteMany({post:req.params.id}).then(()=>{
                    res.redirect('back')
                });
            })
            
        }else{
            res.redirect('back')
        }
    })
    
}