const Comment = require("../models/comments");
const Post = require('../models/posts')
const commentmailer = require('../mailers/comment-mailer');
const commentEmailWorker = require('../workers/comment-email-worker');
const queue = require('../config/kue');
const Like = require('../models/like')


module.exports.create = async function (req, res) {

   await  Post.findById(req.body.post).then((post) => {
        if (post) {
            const creatingcomment = async () => {
                let newcomment = await new Comment({
                    content: req.body.content,
                    user: req.user._id,
                    post: req.body.post
                })

                newcomment.save();
                post.comment.push(newcomment);
                post.save();
                newcomment = await newcomment.populate('user', 'name email');
                // commentmailer.newcomment(newcomment);
                let job = queue.create('emails', newcomment).save((err)=>{
                    if(err){
                        console.log('errror in creating a queue' , err);
                        return;
                    }
                    console.log('job id',job.id);
                })

                if(req.xhr){
                    return res.status(200).json({
                        data:{
                            comment:newcomment
                        },
                        message:"commentadded"
                    })
                }
                req.flash('success', 'comment Added')
                res.redirect('/')
            }
            creatingcomment();
        }
    })
}

module.exports.destroy = async function (req, res) {

    let comment = await Comment.findById(req.params.id)
    if (comment.user == req.user.id) {
        let postid = comment.post;

        //deleting all likes associated to that comment
        await Like.deleteMany({likable:comment._id,onmodel:'comment'});

        //removing comment from list of comments of a post
        await Post.findByIdAndUpdate(postid, { $pull: { comment: req.params.id } });

        await comment.deleteOne();
        req.flash('success', 'comment removed')
        if(req.xhr){
            return res.status(200).json({
                data:{
                    commentid:req.params.id
                },
                message:"comment deleted"
            })
        }
        res.redirect('back');
    } else {
        res.redirect('back')
    }

}