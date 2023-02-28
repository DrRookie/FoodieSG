var express = require("express"); //using the express web framework

var restaurantController = require('./controllers/restaurantController'); // set restaurantController to the restaurantController class
var reviewController = require('./controllers/reviewController'); // set reviewController to the reviewController class
var commentController = require('./controllers/commentController'); // set commentController to the commentController class
var bookmarkController = require('./controllers/bookmarkController'); // set bookmarkController to the bookmarkController class
var accountController = require('./controllers/accountController'); // set accountController to the accountController class


var app = express(); // set variable app to be an instance of express framework. From now on, app is the express



var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));


app.use(express.static("./public")); //static files are to be served from the public folder - for eg. html, images, css
app.use(express.json()); // json() is a method inbuilt in express to recognize the incoming Request Object from the web client as a JSON Object.
// In time to come we will need to accept new or edited comments from user

// Account
app.route('/accounts').get(accountController.getAccountInfo) //1 activate the getAccountInfo method if the route is GET(method) /account/:user_id
app.route('/accounts').post(accountController.addAccount); //1 activate the addAccount method if the route is POST(method) /accounts
app.route('/accounts/:user_id').delete(accountController.deleteAccount); //1 activate the deleteAccount method if the route is DELETE(method) /accounts/:user_id
app.route('/accounts').put(accountController.updateAccount) //1 activate the updateAccount method if the route is PUT(method) /accounts/:user_id
app.route('/login').post(accountController.loginAccount) //1 activate the loginAccount method if the route is PUT(method) /login
app.route('/user').post(accountController.getUser) //1 activate the getUser method if the route is PUT(method) /l


// Restaurant 
app.route('/restaurants').get(restaurantController.getAllRestaurants); //1 activate the getAllRestaurants method if the route is GET(method) /restaurants
app.route('/best').get(restaurantController.getBestRestaurants); //1 activate the getBestRestaurants method if the route is GET(method) /best
app.route('/searchType/:food_type').get(restaurantController.FoodType); //1 activate the FoodType method if the route is GET(method) /searchType/:food_type
app.route('/searchHeading/:heading').get(restaurantController.Heading); //1 activate the FoodType method if the route is GET(method) //searchHeading/:heading
app.route('/searching/:name').get(restaurantController.SearchRestaurant); //1 activate the FoodType method if the route is GET(method) /searching/:name



// Bookmarks
app.route('/bookmarks/user/:id_user').get(bookmarkController.getBookmarkFromUser) // activate the getBookmarkFromUser method if the route is GET(method) /bookmarks/user/:user_id
app.route('/bookmarks').post(bookmarkController.addBookmark); // activate the addBookmark method if the route is POST(method) /bookmarks
app.route('/bookmarks/:bookmark_id_').delete(bookmarkController.deleteBookmark); // activate the deleteBookmark method if the route is DELETE(method) /bookmarks/:bookmark_id_
app.route('/userbookmark').post(bookmarkController.usersWhoBookmarkedSameRestaurant); // activate the usersWhoBookmarkedSameRestaurant method if the route is POSt(method) /userbookmark


// Reviews
app.route('/reviews').get(reviewController.getAllReviews) //1 activate the getAllReviews method if the route is GET(method) /reviews
app.route('/userreview/:username').get(reviewController.getReviewOfEachUser) // activate the getReviewOfEachUser method if the route is PUT(method) /userreview/id
app.route('/reviews').post(reviewController.addReview); //1 activate the addReview method if the route is POST(method) /reviews
app.route('/reviews/:review_id').delete(reviewController.deleteReview); //1 activate the deleteReview method if the route is DELETE(method) /reviews/:review_id
app.route('/reviews/:review_id').put(reviewController.updateReview) //1 activate the updateReview method if the route is PUT(method) /comments/:id

// Comments
app.route('/comments').get(commentController.getCommentFromReview) // activate the getCommentFromReview method if the route is GET(method) /comments/review/:reviewID
app.route('/comments').post(commentController.addComment); // activate the addComment method if the route is POST(method) /comments
app.route('/comments/:id_comments').delete(commentController.deleteComment); // activate the deleteComment method if the route is DELETE(method) /comment/:id_comments



app.listen(8081, "127.0.0.1"); // start the nodejs to be listening for incoming request @ port 8081
console.log("web server running @ http://127.0.0.1:8081"); // output to console 