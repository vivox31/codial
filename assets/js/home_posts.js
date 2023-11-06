{   
    const createpost = function(){
    console.log('vishall')
     newform = $('#new-post-form')

    newform.submit((e)=>{
        e.preventDefault();
        $.ajax({
            type:"POST", 
            url : "/posts/create",
            data : newform.serialize(),
            success : function(data){
                let postitem = newpost(data.data.post);
                $('#posts-list-container').prepend(postitem);
                deletepost($(' .delete-post-button' , postitem));
                // console.log(data.data.post);
            },
            error : function(status , error){
                console.log(status);
                console.log(error);
            }
        })
    });

    function newpost(post){

        return $(`<li id="post-${post._id}">
        <p>
            
            <small>
                <a class="delete-post-button"  href="/posts/destroy/${ post._id }">delete</a>
            </small>
           
            ${ post.content }
            <br>
            <small>
            ${ post.user.name }
            </small>
        </p>
        <div class="post-comments">
            
                <form action="/comments/create" method="POST">
                    <input type="text" name="content" placeholder="Type Here to add comment..." required>
                    <input type="hidden" name="post" value="${ post.id }" >
                    <input type="submit" value="Add Comment">
                </form>
   
            <div class="post-comments-list">
                <ul id="post-comments-${ post._id }">
                    
                </ul>
            </div>
        </div>
        
    </li>`)
    }

    
    }

createpost();

function deletepost(deletelink){
    
    $(deletelink).click((e)=>{
        e.preventDefault();
        $.ajax({
            type:"GET",
            url : $(deletelink).prop('href'),
            success : function(data){
               console.log(data.message)
                $(`#post-${data.data.postid}`).remove();
            },
            error : function(error){

            }
        })
    })


}
}