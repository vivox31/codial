const User = require('../models/users')
const routes = require('../routes/index')
const fs = require('fs');
const path = require('path');


module.exports.profile = function (req, res) {

        User.findById(req.params.id).then((user)=>{
            return res.render('../views/profile',{
                title:'profile',
                profile_user : user,
                
            })
        })       

}

module.exports.sign_up = function (req, res) {

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('sign-up', {
        title: 'codial | sign up '
    })
}

module.exports.sign_in = function (req, res) {
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('sign-in', {
        title: 'codial | sign in',
        
    })
}

module.exports.create = function (req, res) {
    console.log(req.body);

    if (req.body.password != req.body.confirm_password) {
        console.log('password not matched');
        return res.redirect('back');
    }
    const createone = async () => {
        const userdetail = await User.findOne({ email: req.body.email });
        if (!userdetail) {
            const createprofile = async () => {
                const userdata = await new User(req.body)
                userdata.save();
            }
            createprofile();
            res.render('sign-in', {
                title: 'sign-IN'
            });
        } else {
            console.log('user already present!');
            res.redirect('back')
        }

    }
    createone();


}



module.exports.create_session = (req, res) => {
    req.flash('success', 'logged in successfully')
    res.redirect('/');
}



module.exports.destroySession = function(req,res){

    req.logout((err)=>{
        if(!err){
            req.flash('success' , 'logged out successfullly')
     return res.redirect('/');
        }
    })
    

}

module.exports.update = async function(req,res){
    if(req.user.id == req.params.id){
//    await User.findByIdAndUpdate(req.params.id, req.body).then(()=>{
//         res.redirect('back');
//     })
try{
    const user = await User.findById(req.params.id);
    User.uploadedAvatar(req,res ,function(err){
        if(err){
            console.log(err)
        }
        user.name = req.body.name;
        user.email = req.body.email;
        if(req.file){
            if(user.avatar){
                 fs.unlinkSync(path.join(__dirname,"..",user.avatar));
            }
            user.avatar = User.avatarPath + '/' + req.file.filename;
        }
        user.save();
        res.redirect('back');
    })

}catch(err){
    console.log(err);
    res.redirect('back');
}
}else{
    res.status(401).send('unorthorized');
    res.redirect('back');
}
}