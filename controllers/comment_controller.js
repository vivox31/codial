const Comment = require("../models/comments");
const Post = require('../models/posts')

module.exports.create = function (req, res) {

    Post.findById(req.body.post).then((post) => {
        if (post) {
            const creatingcomment = async () => {
                const newcomment = await new Comment({
                    content: req.body.content,
                    user: req.user._id,
                    post: req.body.post
                })

                newcomment.save();
                post.comment.push(newcomment);
                post.save();
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
        res.redirect('back');
    } else {
        res.redirect('back')
    }

}