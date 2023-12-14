{
const createpost = function () {
    // console.log('vishall')
    newform = $('#new-post-form')

    newform.submit((e) => {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/posts/create",
            data: newform.serialize(),
            success: function (data) {
                let postitem = newpost(data.data.post);
                $('#posts-list-container>ul').prepend(postitem);
                deletepost($(' .delete-post-button', postitem));
                new ToggleLike($(' .toggle-like-btn',postitem));
                new Noty({
                    theme: 'relax',
                    text: "Post created!",
                    type: 'success',
                    layout: 'topRight',
                    timeout: 1500
                    
                }).show();
                // console.log(data.data.post);
                (newform)[0].reset();
            },
            error: function (status, error) {
                console.log(status);
                console.log(error);
            }
        })
    });

    function newpost(post) {

        return $(
        `<li id="post-${post._id}">
        <div class="card">
            
            <a class="toggle-like-btn" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
            <span style="position: absolute;right: 120%;"> ${post.likes.length}</span>
            <i class="fa-regular fa-heart"></i> 
             </a>
           
         <a href="/posts/destroy/${post._id}"class="delete-post-button">X</a>

            <div class="user-info">
        


              <h2>${post.user.name}</h2>
            </div>
            <p class="user-text">${post.content}</p>
            <form action="/comments/create" method="post"id= "comment-form">
                <input type="text" name="content" placeholder="Add comment here..." required="true">
                <input type="hidden" name="post" value='${post._id}'>
                <input type="submit" value="ADD">
            </form>
            <div class="comments">
              
              <ul>
                  
              </ul>
              
            </div>
          </div>
        </li>`)
    }

    


}



function deletepost(deletelink) {

    $(deletelink).click((e) => {
        e.preventDefault();
        $.ajax({
            type: "GET",
            url: $(deletelink).prop('href'),
            success: function (data) {
                console.log(data.message)
                $(`#post-${data.data.postid}`).remove();
                new Noty({
                    theme: 'relax',
                    text: "Post Deleted",
                    type: 'success',
                    layout: 'topRight',
                    timeout: 1500
                    
                }).show();
            },
            error: function (error) {

            }
        })
    })


}

let converttoAjax = function(){
    $('#posts-list-container>ul>li').each(function(){
        let self = $(this);
        let deleteButton = $(' .delete-post-button', self);
        deletepost(deleteButton);
    });
}

createpost();
converttoAjax();

    
}


