function encode() {

    var selectedfile = document.getElementById("myinput").files; 
    if (selectedfile.length > 0) {
        var imageFile = selectedfile[0];
        var fileReader = new FileReader();
        fileReader.onload = function (fileloadedEvent) {
            profile_pic = fileloadedEvent.target.result;
            document.getElementById('target').src = profile_pic;
         
        }
        fileReader.readAsDataURL(imageFile);
    }

    
    
}

function update() {

    var updateUser = new XMLHttpRequest();

    updateUser.open("PUT", "/accounts", true);
    updateUser.setRequestHeader("Content-Type", "application/json");
    updateUser.onload = function() {
        $('#successModal').modal('show');


    }

    mobile_num = document.getElementById("mobile_num").value;
    email = document.getElementById("email").value;
   
    var payload = {
        mobile_num:mobile_num,
        email:email,
        profile_pic:profile_pic,
        token:token,
        
        
    
    }

    updateUser.send(JSON.stringify(payload));




}

function deletee(){
    var response = confirm("Are you sure you want to delete your account?");

    if (response == true) {
        var delete_account_url = account_url + "/" + user_id; 
        
        var eraseAccount = new XMLHttpRequest();
        eraseAccount.open("DELETE", delete_account_url, true);
        eraseAccount.onload = function() {
            window.location.href="index.html";
            logoutMe();
            
        };
        eraseAccount.send();
    }
    

}