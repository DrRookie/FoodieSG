"use strict";
const RestaurantsDB = require('../models/RestaurantsDB');

var restaurantsDB = new RestaurantsDB();

function getAllRestaurants(request, respond){
    restaurantsDB.getAllRestaurants(function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });

}

function getBestRestaurants(request, respond){
    restaurantsDB.getBestRestaurants(function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });

}

function FoodType(request, respond) {
    var food_type = request.params.food_type;
    restaurantsDB.FoodType(food_type, function (error, result) {
        if (error) {
            respond.json(error);
        }
        else {
            respond.json(result);
        }
    });

}

function Heading(request, respond) {
    var heading = request.params.heading;
    restaurantsDB.Heading(heading, function (error, result) {
        if (error) {
            respond.json(error);
        }
        else {
            respond.json(result);
        }
    });

}

function SearchRestaurant (request, respond) {
    var searchrestaurant = request.params.name; 
    restaurantsDB.SearchRestaurant(searchrestaurant, function (error, result) {
        if (error) {
            respond.json(error);
        }
        else {
            respond.json(result);
        }
    });


}


module.exports = {getAllRestaurants, getBestRestaurants, FoodType, Heading, SearchRestaurant};