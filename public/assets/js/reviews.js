
var token = sessionStorage.getItem("token");
var picture;
function fetchReviews() {
    var request = new XMLHttpRequest();

    request.open('GET', review_url, true);

    //This command starts the calling of the comments api
    request.onload = function () {
        //get all the comments records into our comments array
        review_array = JSON.parse(request.responseText);
        console.log(review_array);

    };

    request.send();
}

function encode() {

    var selectedfile = document.getElementById("picture").files; 
    if (selectedfile.length > 0) {
        var imageFile = selectedfile[0];
        var fileReader = new FileReader();
        fileReader.onload = function (fileloadedEvent) {
            picture = fileloadedEvent.target.result;
            
         
        }
        fileReader.readAsDataURL(imageFile);
    }

    
    
}



//This function is to display all the comments of that movie
//whenever the user click on the "comment" button
function showRestaurantReviews(element) {
    
    document.getElementById("emptyReview").innerHTML = "No reviews yet. Create one now!";
    var item = element.getAttribute("item");
    currentIndex = item;
    document.getElementById("restaurant_name").textContent = "Review for " + restaurant_array[item].name;
    document.getElementById("reviewBody").textContent = "";
    star = "";
    
    if (username != null){
        document.getElementById("newReview").style.display = "block"
    } 

    for (var i = 0; i < review_array.length; i++) {
       
        if (review_array[i].restaurant_name === restaurant_array[item].name) {
            document.getElementById("emptyReview").innerHTML = "";
            selectedRestaurantId = restaurant_array[item].id;
            var html = '<div class="text-center" style="width:100%;">                                                           \
                            <div class="card">                                                                                  \
                                <div class="card-body" >\
                                <div class = "info" align="left" style = "position:absolute; left:30px; top:15px; "> <p>'+ review_array[i].username + '</p><small> ' + review_array[i].date_posted + '</small></div>   \                                                                     \
                                    <br></br> <p class="card-text" align="center" id="rating' + i + '"><b>Qn: How was the food?</b> <br>' + review_array[i].review_qn_one + "</p>               \
                                      <p><b> Qn: How was the place?</b><br> " + review_array[i].review_qn_two + " </p> \
                                      <p align = 'left'>Picture Taken:</p><img align='left' class = 'rstpic' id 'thepicture' src=' "+ review_array[i].picture + "' alt='restaurant upload pic' class='img-thumbnail'><button type='button' class='btn btn-info btn-lg' data-toggle='modal' data-target='#commentingModal' style ='position: absolute; right:0; bottom:0;' item= ' " + i +" onclick = 'showCommentsForReviews(this);'>See comments</button>\
                                </div>                                                                                          \
                            </div>                                                                                              \
                        </div>";
            document.getElementById("reviewBody").insertAdjacentHTML('beforeend', html);
            
            var star = "";
            for (var j = 0; j < review_array[i].rating; j++) {
                console.log(i);
                star += "<img src='assets/images/star.png' style='width:50px' />";
            }
            
            
            
            if (username === review_array[i].username && token != "Invalid") {
                
                star += "<i class='far fa-trash-alt fa-2x edit' id = 'deleting' data-dismiss='modal' item='" + i + "' onClick='deleteReview(this)' ></i>";
                star += "<i class='far fa-edit fa-2x edit' data-toggle='modal'  id = 'editing' data-target='#editReviewModal' data-dismiss='modal' item='" + i + "' onClick='editReview(this)' ></i>";
            } 
                
        
            

            
            
            document.getElementById("rating" + i).insertAdjacentHTML('beforebegin', star + "<br/>");
            
        }

        

       
    } 


    
}

function newReview() {
        //Initialise each HTML input elements in the modal window with default value.
        rating = 0;
        document.getElementById("userReviews").value = "";
        document.getElementById("nickname").value = username;
    }



// Submit or send the new comment to the server to be added.
function addReview() {
    var review = new Object();
    review.restaurant_id = restaurant_array[currentIndex].id; // Movie ID is required by server to create new comment 
    review.restaurant_name = restaurant_array[currentIndex].name; // Movie title is required by server to create new comment
    review.username = username;// Value from HTML input text
    review.review_qn_one = document.getElementById("userReviews").value; 
    review.review_qn_two = document.getElementById("userReviews2").value;// Value from HTML input text
    review.date_posted = null; // Change the datePosted to null instead of taking the timestamp on the client side;
    review.rating = rating;
    review.picture = document.getElementById("picture").value;





    var postReview = new XMLHttpRequest(); // new HttpRequest instance to send comment

    postReview.open("POST", review_url, true); //Use the HTTP POST method to send data to server

    postReview.setRequestHeader("Content-Type", "application/json");
    postReview.onload = function() {
        	console.log("new review sent");
	        fetchReviews(); // fetch all comments again so that the web page can have updated comments.     
    };
    
        // Convert the data in Comment object to JSON format before sending to the server.
        postReview.send(JSON.stringify(review)); 
    
    
}

//This function allows the user to mouse hover the black and white popcorn
//so that it will turn to a colored version when hovered
function rateIt(element) {
    var num = element.getAttribute("value");
    var classname = element.getAttribute("class");
    var popcorns = document.getElementsByClassName(classname);
    var classTarget = "." + classname;

    // This is another way of writing 'for' loop, which initialises the 
    // popcorn images to use black and white.
    for (let popcorn of popcorns){
        popcorn.setAttribute("src", popcornBWImage);
    }
    changePopcornImage(num, classTarget);
}

// This function sets the rating and coloured images based on the value of the image tag when  
// the mouse cursor hovers over the popcorn image.
function changePopcornImage(num, classTarget) {
    switch (eval(num)) {
        case 1:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", popcornImage);
            rating = 1;
            break;
        case 2:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", popcornImage);
            rating = 2;
            break;
        case 3:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", popcornImage);
            rating = 3;
            break;
        case 4:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='4']").setAttribute("src", popcornImage);
            rating = 4;
            break;
        case 5:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='4']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='5']").setAttribute("src", popcornImage);
            rating = 5;
            break;
    }
}


//This function will hide the existing modal and present a modal with the selected comment
//so that the user can attempt to change the username, rating or movie review
function editReview(element) {
    var item = element.getAttribute("item");

    currentIndex = item;

    document.getElementById("editnickname").value = review_array[item].username;
    document.getElementById("edituserReview").value = review_array[item].review_qn_one;
    document.getElementById("edituserReviewtwo").value = review_array[item].review_qn_two;
    console.log(review_array[item].rating);
    displayColorPopcorn('editpop', review_array[item].rating);
}

//This function displayS the correct number of colored popcorn
//based on the movie rating that is given in the user comment
function displayColorPopcorn(classname, num) {
    var pop = document.getElementsByClassName(classname);
    var classTarget = "." + classname;
    for (let p of pop) {
    p.setAttribute("src", popcornBWImage);
    }
    changePopcornImage(num, classTarget);
    }

//slide 10 comments.js  -- Add the following
//This function sends the Comment data to the server for updating
function updateReview() {
    var response = confirm("Are you sure you want to update this review?");
    if (response == true) {
        var edit_review_url = review_url + "/" + review_array[currentIndex].review_id;
        var updateReview = new XMLHttpRequest(); // new HttpRequest instance to send request to server
        updateReview.open("PUT", edit_review_url, true); //The HTTP method called 'PUT' is used here as we are updating data
        updateReview.setRequestHeader("Content-Type", "application/json");
        review_array[currentIndex].username = document.getElementById("editnickname").value;
        review_array[currentIndex].review_qn_one = document.getElementById("edituserReview").value;
        review_array[currentIndex].review_qn_two = document.getElementById("edituserReviewtwo").value;
        review_array[currentIndex].rating = rating;
        updateReview.onload = function () {
            fetchReviews();
        };

        updateReview.send(JSON.stringify(review_array[currentIndex]));
    }
}

//This function deletes the selected comment in a specific movie
function deleteReview(element) {
    var response = confirm("Are you sure you want to delete this review?");

    if (response == true) {
        var item = element.getAttribute("item"); //get the current item
        var delete_review_url = review_url + "/" + review_array[item].review_id;
        
        var eraseReview = new XMLHttpRequest();
        eraseReview.open("DELETE", delete_review_url, true);
        eraseReview.onload = function() {
            fetchReviews();
        };
        eraseReview.send();
    }
}



function getReviewforEachUser() {
    var request = new XMLHttpRequest();   
    eachReview_url += username 
	request.open('GET', eachReview_url, true);    
	//This function will be called when data returns from the web api    
	request.onload = function() {        
		//get all the eachReview records into our movie array        
		eachReviewarray = JSON.parse(request.responseText);        
		
		console.log(eachReviewarray) // output to console        
		//call the function so as to display all movies tiles for "Now Showing"   
        displayReviewforEachUser();     	
		
        

	 
	};    

	//This command starts the calling of the movies web api    
	request.send();

    
    
}

function displayReviewforEachUser() {

    if (eachReviewarray === null) {
        document.getElementById("emptys").innerHTML = "Oh, you have not reviewed any restaurants yet! \nGo write some reviews NOW!";

    } else {
        star = "";
        for (let index = 0; index < eachReviewarray.length; index++) {
            document.getElementById("emptys").innerHTML = "";
            var html = '<div class="text-center" style="width:100%;">                                                           \
                            <div class="card">                                                                                  \
                                <div class="card-body" >\
                                <div class = "info" align="left" style = "position:absolute; left:30px; top:15px; "> <p>'+ eachReviewarray[index].restaurant_name + '</p><small> ' + eachReviewarray[index].date_posted + '</small></div>   \                                                                     \
                                    <br></br> <p class="card-text" align="center" id="rating' + eachReviewarray[index].rating + '"><b>Qn: How was the food?</b> <br>' + eachReviewarray[index].review_qn_one + "</p>               \
                                      <p><b> Qn: How was the place?</b><br> " + eachReviewarray[index].review_qn_two + " </p> \
                                      \
                                </div>                                                                                          \
                            </div>                                                                                              \
                        </div>";
            document.getElementById("reviewsdisplay").insertAdjacentHTML('beforeend', html);

            var star = "";
            for (var j = 0; j < eachReviewarray[index].rating; j++) {
                console.log(index);
                star += "<img src='assets/images/star.png' style='width:50px' />";
            }
            
            document.getElementById("rating" + eachReviewarray[index].rating ).insertAdjacentHTML('beforebegin', star + "<br/>");
            



        }
        
    }
    

    
    
}


    
    



