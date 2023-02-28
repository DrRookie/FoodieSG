//This function is to call the restaurants api and get all the restaurants
function getRestaurantData() {    
	var request = new XMLHttpRequest();    
	request.open('GET', restaurant_url, true);    
	//This function will be called when data returns from the web api    
	request.onload = function() {        
		//get all the movies records into our movie array        
		restaurant_array = JSON.parse(request.responseText);        
		
		console.log(restaurant_array) // output to console        
		//call the function so as to display all movies tiles for "Now Showing"        	
		displayRestaurant(restaurant_array);
        fetchReviews();
        getAccountData();
        

	 
	};    

	//This command starts the calling of the movies web api    
	request.send();

}


function displayRestaurant(restaurant_array) {
    var table = document.getElementById("restaurantsTable");
    var restaurantCount = 0;
    var message = "";

    table.innerHTML = "";
    totalRestaurants = restaurant_array.length;
    for (var count = 0; count < totalRestaurants; count++) {
		var photos_food = restaurant_array[count].photos_food;
		var name = restaurant_array[count].name;
		var cell = '<div class="shadow p-3 mb-5 bg-white rounded" style=" width: 300px; height:350px;"  ><img class="rounded" src="' + photos_food + '" alt="Card image cap" >\
        <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light"><br><i class="far fa-comment fa-lg" style="float:left;cursor:pointer" data-toggle="modal" data-target="#reviewModal" item="' + count + '" onClick="showRestaurantReviews(this)"></br></i>\
        <h5 style="padding-left:30px;cursor:pointer" data-toggle="modal" data-target="#restaurantModel" class="card-title" item="' + count + '" onClick="showRestaurantDetails(this)">' + name + '</h5></div>\
</div>'
        table.insertAdjacentHTML('beforeend', cell);
        restaurantCount++;   
    }
	message = restaurantCount + " Total restaurants showing" ;
    document.getElementById("summary").textContent = message;
   	document.getElementById("parent").textContent = "";

}

//This function is to display the individual movies details
//whenever the user clicks on "See More"
function showRestaurantDetails(element) {
    var item = element.getAttribute("item");
    currentIndex = item;
    document.getElementById("name").textContent = restaurant_array[item].name;
    document.getElementById("photos_shop").src = restaurant_array[item].photos_shop;
    document.getElementById("food_type").textContent = restaurant_array[item].food_type;
    document.getElementById("opening_hours").textContent = restaurant_array[item].opening_hours;
    document.getElementById("heading").textContent = restaurant_array[item].heading;
    document.getElementById("contact_num").textContent = restaurant_array[item].contact_num;
    document.getElementById("overall_rating").textContent = restaurant_array[item].overall_rating;
    document.getElementById("information").textContent = restaurant_array[item].information;
    document.getElementById("address").textContent = restaurant_array[item].address;
}

function showMap() {
    var location = [restaurant_array[currentIndex].name,restaurant_array[currentIndex].longitude, restaurant_array[currentIndex].latitude];
    map = new google.maps.Map(document.getElementById("map"), {center:{lat:1.8, lng:110.9}, zoom:12});
    var infowindow = new google.maps.InfoWindow();
    var marker, i;
    var markers =[];

    marker=new google.maps.Marker({
        position : new google.maps.LatLng(location[1], location[2]),
        map:map,
        icon : { url : 'http://maps.google.com/mapfiles/ms/icons/restaurant.png'

        }
    })

    markers.push(marker);
    google.maps.event.addListener(marker, 'click', (function (marker, i){
        return function(){
            infowindow.setContent(location[0])
            infowindow.open(map,marker);
        }
    })(marker,i));


    navigator.geolocation.getCurrentPosition(
        (position)=>{
            const pos ={
                lat:position.coords.latitude,
                lng:position.coords.longitude
            }
            map.setCenter(pos);
            map.setZoom(12);
            marker = new google.maps.Marker({
                position : new google.maps.LatLng(pos.lat,pos.lng),
                map:map,
                icon : { url : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'

                }

            });

            markers.push(marker);
            google.maps.event.addListener(marker, 'click',(function (marker,i){
                return function(){
                    infowindow.setContent("Your current Location");
                    infowindow.open(map,marker);

                }
            }) (marker,i));
        }
    )



}


function showAll(){
    setTimeout("location.reload(true);",1000); 

}



function getRestaurantDataByHeading(Heading) {
    heading = Heading.getAttribute("item");
    restaurant_url = "/searchHeading/" + heading;
    restaurant_array = [];

    var request = new XMLHttpRequest();
    request.open('GET', restaurant_url, true);
    console.log(heading);
    console.log(restaurant_array);

    request.onload = function () {
        console.log("ok");
        restaurant_array = JSON.parse(request.responseText);
        console.log(restaurant_array);

        displayRestaurant(restaurant_array);
    };
    request.send();


}


function getRestaurantDataByCato(Food_Type) {
    food_type = Food_Type.getAttribute("item");
    restaurant_url = "/searchType/" + food_type;
    restaurant_array = [];

    var request = new XMLHttpRequest();
    request.open('GET', restaurant_url, true);
    console.log(food_type);
    console.log(restaurant_array);

    request.onload = function () {
        console.log("ok");
        restaurant_array = JSON.parse(request.responseText);
        console.log(restaurant_array);

        displayRestaurant(restaurant_array);
    };
    request.send();


}

function bestRestaurant(){
    
    var best_url = "/best";
    restaurant_array = [];

    var request = new XMLHttpRequest();
    request.open('GET', best_url, true);
    console.log(restaurant_array);

    request.onload = function () {
        console.log("ok");
        restaurant_array = JSON.parse(request.responseText);
        console.log(restaurant_array);

        displayRestaurant(restaurant_array);
    };
    request.send();
    

}




const restaurantsList = document.getElementById('restaurantsList');
const searchBar = document.getElementById('searchBar');
console.log(searchBar);

searchBar.addEventListener('keyup',(e) => {
    const searchString = e.target.value.toLowerCase();
    console.log(searchString);
    //if searchStr is H ->h
    //if searchStr is h->h
    //convert restaurant title to lowercase then compare
    const filteredRestaurants = restaurant_array.filter((restaurant) => {
        return (restaurant.name.toLowerCase().includes(searchString)
    );

});
console.log(filteredRestaurants);
displayRestaurant(filteredRestaurants);
})






