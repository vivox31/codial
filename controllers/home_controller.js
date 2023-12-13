const Post = require("../models/posts");
const User = require("../models/users")
module.exports.home = async function (req, res) {

try{
    let post = await Post.find({})
        .populate('user')
        .populate({
            path: 'comment',
            populate: {
                path: 'user'
            }
        }).exec()
        //TODO populate the likes of a post
    let user = await User.find({})

    return res.render('home', {
        title: 'codial | home',
        posts: post,
        all_users: user,
        
    })
}catch(err){
     console.log('error :', err);
}
}

