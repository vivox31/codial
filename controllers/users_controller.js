
module.exports.profile = function(req,res){
    return  res.end('<h1> prfile section </h1>')
}

module.exports.sign_up = function(req,res){
    return res.render('sign-up',{
        title:'codial | sign up '
    })
}

module.exports.sign_in = function(req,res){
    return res.render('sign-in',{
        title:'codial | sign in'
    })
}

module.exports.create = function(req ,res){
    // Todo
}

module.exports.create_session = function(req, res){
    // Todo 
}