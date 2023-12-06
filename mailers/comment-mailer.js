const { info } = require('sass');
const mailer = require('../config/nodemailer');


exports.newcomment = (comment)=>{

    htmlString = mailer.rendertemplate({comment:comment},'/comments/new-comment.ejs')
    mailer.transport.sendMail({
        from:'vishalkalwani623@gmail.com',
        to: comment.user.email,
        subject:'new comment published',
        html: htmlString
    },(err,info)=>{
        if(err){
            console.log("error in nodemailer" ,err,comment.user.email);
            return;
        }

        console.log('succefully sent',info);
        return;
    })
}


// for some reason/error mailer is not working right now i have to fix it 