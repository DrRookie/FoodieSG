function logoutMe () {
    $("#signupMenu").show();
    $("#loginMenu").show();
    $("#logoutMenu").hide();  

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("tokenForusername");



    
    document.location.reload(true);
    setTimeout("location.reload(true);",1000);

    



}