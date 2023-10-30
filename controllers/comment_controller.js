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