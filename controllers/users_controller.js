const User = require('../models/users')
const routes = require('../routes/index')


module.exports.profile = function (req, res) {

        User.findById(req.params.id).then((user)=>{
            return res.render('../views/profile',{
                title:'profile',
                profile_user : user
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
        title: 'codial | sign in'
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

// module.exports.create_session = function (req,res) {
//     // Todo 
//     // const createSession = async () => {
//     //     const user = await User.findOne({ email: req.body.email }).catch((err) => {
//     //         console.log('error in finding user', err);
//     //         return res.redirect('back')
//     //     });

//     //     if (user) {

//     //         // check users password
//     //         if (user.password != req.body.password) {
//     //             console.log('password mismatch')
//     //             return res.redirect('/users/sign-in')
//     //         }

//     //         // session creation
//     //         res.cookie('user_id', user.id);
//     //         res.redirect('/users/profile')
//     //     } else {
//     //         console.log('user not found')
//     //         res.redirect('back')
//     //     }
//     // }
//     // createSession();
//     console.log(req.cookies)
//     return  res('/')
//     // return res.render('../views/profile',{
//     //     title : 'profile page'
//     // })

// }


module.exports.create_session = (req, res) => {
    res.redirect('/');
}



module.exports.destroySession = function(req,res){
    req.logout(function(err){
        if(err){
            return next(err);
        }
        return res.redirect('/');
    });
   
}