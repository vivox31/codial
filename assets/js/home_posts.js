{
    const createpost = function () {
        console.log('vishall')
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
                    // console.log(data.data.post);
                },
                error: function (status, error) {
                    console.log(status);
                    console.log(error);
                }
            })
        });

        function newpost(post) {

            return $(`
        <li >
            
            <a href="/posts/destroy/${post.id}">delete</a>
                
            <p>
            ${post.content}
            <br>
            <small>${post.user.name}</small>
            <form action="/comments/create" method="post" id="comment-form">
                <input type="text" name="content" placeholder="Add comment here..." required="true">
                <input type="hidden" name="post" value='${post._id}'>
                <input type="submit" value="ADD">
            </form>
            <div id="comment-list">
            </div>
            </p>
        </li>`)
        }


    }

    createpost();

    function deletepost(deletelink) {

        $(deletelink).click((e) => {
            e.preventDefault();
            $.ajax({
                type: "GET",
                url: $(deletelink).prop('href'),
                success: function (data) {
                    console.log(data.message)
                    $(`#post-${data.data.postid}`).remove();
                },
                error: function (error) {

                }
            })
        })


    }

    function createcomment() {
        let commentform = $('#comment-form');
        commentform.submit((e) => {
            e.preventDefault();

            $.ajax({
                type: "POST",
                url: "/comments/create",
                data: commentform.serialize(),
                success: function (data) {
                    let newcomment = creatingNewComment(data.data.comment);
                    $('#comment-list').prepend(newcomment);
                    deletecomment($(' .delete-comment',newcomment));
                    console.log(data.message)
                },
                error: function (error) {
                    console.log(error)
                }
            })
        })
    }

    function creatingNewComment(comment) {
        return $(`
        <l1 id="comment-${comment._id}">
        <p>
        <a class="delete-comment" href="/comments/destroy/${comment._id}">delete</a>
        <li>${comment.content}</li>
        <li>${comment.user.name}</li>
        </P>
        </li>`)
    }

    createcomment();

    function deletecomment(deletelink) {
        $(deletelink).click((e) => {
            e.preventDefault();
            $.ajax({
                type: 'GET',
                url: $(deletelink).prop('href'),
                success: function(data){
                    console.log(data.message)
                    $(`#comment-${data.data.commentid}`).remove();
                    
                },
                error:function(error){
                    console.log(error);
                }
            })
        })
    }
}