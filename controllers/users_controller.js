const User = require('../models/users')


module.exports.profile = function (req, res) {

    if (req.cookies.user_id) {
        const checkSignedIn = async () => {
            const result = await User.findById(req.cookies.user_id).catch((err) => {console.log(err);})

            if (result) {
               return res.render('profile', {
                    title: 'profile page',
                    user : result
                })
            }
               return res.redirect('/users/sign-in')

        }
        checkSignedIn();
    }else{
        return res.redirect('/users/sign-in');
    }
}

module.exports.sign_up = function (req, res) {
    return res.render('sign-up', {
        title: 'codial | sign up '
    })
}

module.exports.sign_in = function (req, res) {
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

module.exports.create_session = function (req,res) {
    // Todo 
    // const createSession = async () => {
    //     const user = await User.findOne({ email: req.body.email }).catch((err) => {
    //         console.log('error in finding user', err);
    //         return res.redirect('back')
    //     });

    //     if (user) {

    //         // check users password
    //         if (user.password != req.body.password) {
    //             console.log('password mismatch')
    //             return res.redirect('/users/sign-in')
    //         }

    //         // session creation
    //         res.cookie('user_id', user.id);
    //         res.redirect('/users/profile')
    //     } else {
    //         console.log('user not found')
    //         res.redirect('back')
    //     }
    // }
    // createSession();
    // console.log('function callllll')
   res.redirect('/')
    // return res.render('../views/profile',{
    //     title : 'profile page'
    // })
    
}