function getAccountData() {    
	var request = new XMLHttpRequest();    
	request.open('GET', account_url, true);    
	//This function will be called when data returns from the web api    
	request.onload = function() {        
		//get all the movies records into our movie array        
		account_url = JSON.parse(request.responseText);  
           
        for (let index = 0; index < account_url.length; index++) {
            allusernames[index] = account_url[index].username;
            
        }
        
		 
		
        

	 
	};    

	//This command starts the calling of the movies web api    
	request.send();

}




function loginMe(){

    var loginUser = new XMLHttpRequest();

    loginUser.open("POST", "/login", true);
    loginUser.setRequestHeader("Content-Type", "application/json");
    loginUser.onload = function() {
         

        var token = JSON.parse(loginUser.responseText);
        var tokenForusername = JSON.parse(loginUser.responseText);
        console.log(token.result);

        if (token.result != "Invalid") {
            $('#successModal').modal('show');
            $('#loginModall').modal('hide');
            document.getElementById("signupMenu").style.display="none";
            document.getElementById("loginMenu").style.display="none";
            document.getElementById("logoutMenu").style.display="block";


           

            var username = document.getElementById("usernamelogin").value;
    
            

            sessionStorage.setItem("token", token.result);
            sessionStorage.setItem("tokenForusername", username);
            
            setTimeout("location.reload(true);",700); 
            
        } else {
            $('#failModal').modal('show');
            
            
        }
        

    }

    var usernamee = document.getElementById("usernamelogin").value;
    var password = document.getElementById("passwordlogin").value;
    
    if ((usernamee == "" && password == "")|| (usernamee == "") || (password == "")){
        alert("Please enter Username and/or Password!")
        return;
    }




    var increment = 0;
    var count = allusernames.length;
    
    while (true) {
        if (usernamee == allusernames[increment]) {

            var payload = {
                username:usernamee,
                password:password
            
            }
            loginUser.send(JSON.stringify(payload));

            break;

        } else {
           increment +=1;
           count -= 1;
           if (count < 0){
               alert("Username and/or Password is Invalid, \nPlease try again!")
              $('#failModal').modal('show');
              $('#logianModall').modal('hide');
               break;
           }
           
           

        

        }

    }
   
   
    

}