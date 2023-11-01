const Comment = require("../models/comments");
const Post  =  require('../models/posts')

module.exports.create = function(req,res){

    Post.findById(req.body.post).then((post)=>{
        if(post){
            const creatingcomment = async()=>{
                const newcomment = await new Comment({
                    content:req.body.content,
                    user : req.user._id,
                    post : req.body.post
                })

                newcomment.save();
                post.comment.push(newcomment);
                post.save();
                res.redirect('/')
            }
            creatingcomment();
        }
    })
}

module.exports.destroy = function(req,res){
    
    Comment.findById(req.params.id).then((comment)=>{
        if(comment.user == req.user.id){
        let postid = comment.post;
       
        Post.findByIdAndUpdate(postid , {$pull : {comment : req.params.id}}).then((post)=>{

        })
        comment.deleteOne();
        res.redirect('back');
    }else{
        res.redirect('back')
    }
})

}