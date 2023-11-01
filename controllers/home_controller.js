const Post = require("../models/posts");
const User = require("../models/users")
module.exports.home = function(req,res){
    

    Post.find({})
    .populate('user')
    .populate({
        path:'comment',
        populate : {
            path:'user'
        }
    })
    .exec().then((post)=>{
        User.find({}).then((user)=>{
            return res.render('home' , {
                title:'codial | home',
                posts : post,
                all_users : user
        })
        })
        
    })
  
}

