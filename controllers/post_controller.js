const Post = require('../models/posts');
const Comment = require('../models/comments')

module.exports.create = async function (req, res) {

    try {
        let newpost = await new Post({ content: req.body.content, user: req.user._id }).populate('user');
        newpost.save();

        if (req.xhr) {
            return res.status(200).json({
                data: {
                    post: newpost
                },
                message: "post created!"
            });
        }
        req.flash('success', 'post created')
        res.redirect('back')

    } catch (err) {
        colsole.log(err);
        res.redirect('back')
    }
}

module.exports.destroy = async function (req, res) {

    let post = await Post.findById(req.params.id)
    if (post.user == req.user.id) {

        await post.deleteOne();
        await Comment.deleteMany({ post: req.params.id })

        if (req.xhr) {
            return res.status(200).json({
                data: {
                    postid: req.params.id
                },
                message: "post created!"
            });
        }
        req.flash('success', 'post deleted')
        res.redirect('back')

    } else {
        req.flash('error', "you can't delete this post!!")
        res.redirect('back')
    }


}