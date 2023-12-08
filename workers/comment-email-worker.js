const queue = require('../config/kue');
const commentsmailer = require('../mailers/comment-mailer');

queue.process('emails' , function(job,done){

    // console.log(job.data);
    commentsmailer.newcomment(job.data);
    done();
})  