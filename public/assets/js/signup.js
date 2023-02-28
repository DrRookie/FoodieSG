var profile_pic;


function encode() {

    var selectedfile = document.getElementById("profile_pic").files; 
    if (selectedfile.length > 0) {
        var imageFile = selectedfile[0];
        var fileReader = new FileReader();
        fileReader.onload = function (fileloadedEvent) {
            profile_pic = fileloadedEvent.target.result;
            
         
        }
        fileReader.readAsDataURL(imageFile);
    }

    
    
}


function registerMe(){

    var registerUser = new XMLHttpRequest();

    registerUser.open("POST", "/accounts", true);
    registerUser.setRequestHeader("Content-Type", "application/json");
    registerUser.onload = function() {
        
        $('#signupModal').modal('hide');
        $('#successModal').modal('show');

    }

    var username = document.getElementById("usernamee").value;
    var password = document.getElementById("password").value;
    var first_name = document.getElementById("first_name").value;
    var last_name = document.getElementById("last_name").value;
    var gender;
    if(document.getElementById('Male').checked) {
        //Male radio button is checked
        var gender = "Male";
    }else if(document.getElementById('Female').checked) {
        //Female radio button is checked
        var gender = "Female";
    }

    var mobile_num = document.getElementById("mobile_num").value;
    var email = document.getElementById("email").value;
   

    if(username == "") {
        alert("Username is required!")
        return;
    } 
    else if(password == "") {
        alert("Password is required!")
        return;
    } 
    
    
    if(first_name == "") {
        alert("First name is required!")
        return;
    }
    if(last_name == "") {
        alert("Last name is required!")
        return;
    }
    if(gender == null) {
        alert("Gender is required!")
        return;
    }
    if(mobile_num == "") {
        alert("Mobile number is required!")
        return;
    }
    if (email == "") {
        alert("Email is required!")
        return;
    }

    
    
    
    
    var payload = {
        username:username,
        password:password,
        first_name:first_name,
        last_name:last_name,
        gender:gender,
        mobile_num:mobile_num,
        email:email,
        profile_pic:profile_pic
    }
    
    registerUser.send(JSON.stringify(payload));

    setTimeout("location.reload(true);",1000); 
        
    
    
    

}