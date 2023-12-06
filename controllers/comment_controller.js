const Comment = require("../models/comments");
const Post = require('../models/posts')
const commentmailer = require('../mailers/comment-mailer');

module.exports.create = function (req, res) {

    Post.findById(req.body.post).then((post) => {
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
                commentmailer.newcomment(newcomment);
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