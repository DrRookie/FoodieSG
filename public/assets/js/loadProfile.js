$(document).ready(function (){

 
    var getProfile = new XMLHttpRequest();

    getProfile.open("POST","/user", true);
    getProfile.setRequestHeader("Content-Type","application/json");
    getProfile.onload = function (){
        profile = JSON.parse(getProfile.responseText);
        console.log(getProfile.responseText);
        profile_pic = profile[0].profile_pic;
        mobile_num = profile[0].mobile_num;
        email = profile[0].email;
        username = profile[0].username;
        user_id = profile[0].user_id;
        document.getElementById("username").value = username;
        document.getElementById("mobile_num").value = mobile_num;
        document.getElementById("email").value = email;
        //document.getElementById("user_id").value = user_id;
        if (profile_pic == null){
            document.getElementById("target").src = "assets/uploads/19601.jpg"
        } else {
            document.getElementById("target").src = profile_pic;
        }
       



    }
    var payload = {token : token};
    getProfile.send(JSON.stringify(payload));


})