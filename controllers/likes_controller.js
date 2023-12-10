const Like = require('../models/like');
const Post = require('../models/posts');
const Comment = require('../models/comments');


module.exports.toggleLike = async function(req,res){
    // req = /likes/toggle/?id=abcd&type=post

    let likeable;
    let deleted = false;
    if(req.query.type = 'post'){
        likeable = await Post.findById(req.query.id).populate('likes'); 
    }else{
        likeable = await Comment.findById(req.query.id).populate('likes');
    }

    let exitstinglike = Like.findOne({
        likeable:req.query.id,
        onmodel:req.query.id
    })

    if(exitstinglike){
        likeable.likes.pull(exitstinglike._id);
        likeable.save();
        exitstinglike.deleteOne();
        deleted = true;
    }else{
        const newlike = new Like({
            user:req.user,
            likeable:req.query.id,
            onmodel:req.query.type,
        })
        newlike.save();
        likeable.likes.push(newlike._id);
    }

    return res.json(200,{
        message:'like added successfully',
        data :{
            deleted:deleted
        }
    })


}