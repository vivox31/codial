
module.exports.home = function(req,res){
    // console.log(req.cookies)
    // res.cookie('userID', 4566)
   return res.render('home' , {
            title:'home'
    })
}