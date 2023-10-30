const Post = require("../models/posts");

module.exports.home = function(req,res){
    

    Post.find({}).populate('user').exec().then((post)=>{
        return res.render('home' , {
            title:'codial | home',
            posts : post
    })
    })
  
}

