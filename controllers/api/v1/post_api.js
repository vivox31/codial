
const Post = require('../../../models/posts');
const Comment = require('../../../models/comments');


module.exports.index = async (req,res)=>{

    
    let post = await Post.find({})
    .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comment',
            populate: {
                path: 'user'
            }
        }).exec()
        return res.status(200).json({
        message:'list of posts',
        posts:post
    })
}


module.exports.destroy = async function (req, res) {

    
    
    try{
        let post = await Post.findById(req.params.id)
        await post.deleteOne();
        await Comment.deleteMany({ post: req.params.id })

        return res.status(200).json({
            message:'post deleted successfully'
        })
        // if (req.xhr) {
        //     return res.status(200).json({
        //         data: {
        //             postid: req.params.id
        //         },
        //         message: "post created!"
        //     });
        
        // req.flash('success', 'post deleted')
        // res.redirect('back')

    // else 
    //     req.flash('error', "you can't delete this post!!")
    //     res.redirect('back')
    // }
}catch(err){
    console.log(err);
    return res.json(404,{
        message:"internal server error"
    })
}


}