
$(document).ready(function (){

    var token = sessionStorage.getItem("token");
    username = sessionStorage.getItem("tokenForusername");
    if (token != null) {
        
        $("#signupMenu").hide();
        $("#loginMenu").hide();
        $("#logoutMenu").show();  

        document.getElementById("usernamebutton").textContent = "Welcome "+username+"!";


        
    } 

    
    

    


})