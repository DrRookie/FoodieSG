
$(document).ready(function (){

 
    if (token != null) {
        
        $("#signupMenu").hide();
        $("#loginMenu").hide();
        $("#logoutMenu").show();  
        
    } else {
        window.location.href="index.html";
    }
    

    


})