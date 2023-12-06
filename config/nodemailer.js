const nodemailer = require('nodemailer');
const path = require('path');
const ejs = require('ejs')

// const dljg = require("../mailers/templates/comments/new-comment.ejs")

// sending mails include 4 steps - 'setting up nodemailer'  ,
//  'configuration(transport, rendertemplate)', 'set up mailer files' ans 'creating templates'


let transport = nodemailer.createTransport({
    service:'gmail',
    host: 'smtp.gmail.com',
    port:578,
    secure: false,
    auth :{
        user:'vishalkalwani623@gmail.com',
        pass:'nxkk vkrq drkp srsc'
    }
});

let rendertemplate = (data,relativepath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,"../views/mailers",relativepath),
        data,
        function(err,template){
            if(err){
                console.log("error in templates" , err);
                return;
            }
            mailHTML = template;
        }
    )
    return mailHTML;
}

module.exports = {
    transport : transport,
    rendertemplate : rendertemplate,

}
