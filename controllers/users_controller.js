const User = require('../models/users')


module.exports.profile = function (req, res) {
    return res.end('<h1> prfile section </h1>')
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
            res.render('sign-in',{
                title:'sign-IN'
            });
        } else {
            console.log('user already present!');
            res.redirect('back')
        }

    }
    createone();


}

module.exports.create_session = function (req, res) {
    // Todo 
}