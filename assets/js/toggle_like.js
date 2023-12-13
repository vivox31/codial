console.log('calling')
class ToggleLike{
    constructor(toggleElement){
        this.toggler = toggleElement
        this.togglelike();
    }


     togglelike() {
        
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self = this;
            $.ajax({
                type: "POST",
                url: $(self).prop('href'),
                success: function (data) {
                    console.log(data.message)
                    let likesCount = parseInt($(self).attr('data-likes'))
                    console.log(data.data)
                    if(data.data.deleted){
                        likesCount -=1;
                    }else{
                        likesCount +=1;
                    }
                    $(self).attr('data-likes', likesCount);
                    $(self).html(`<span style="position: absolute;right: 120%;"> ${likesCount}</span>
                    <i class="fa-regular fa-heart"></i>`);
                },
                error: function (error) {
                    console.log(error)
                }
            })
              
        });
    }
       
    
}