$('#loginBtn').click(function(){

    var name = $('#name').val();
    var password = $('#password').val();
    var postData = new FormData();
    postData.append('username', name);
    postData.append('password', password);
    $.ajax({
        url: 'user/login',
        method: 'POST',
        data: postData,
        contentType: false,
        processData:false,
        dataType: 'json',
        mimeType: "multipart/form-data",
        success: function(res){
            if(res.status === 0){
                location.reload();
            }else
                alert(res.message);
        },

        error: function(){
            alert('网络错误');
        }

    });
});