"use strict";

var db = require('../db-connections');
class RestaurantsDB{
    getAllRestaurants(callback){
        var sql = "SELECT * from foodiesg_db.restaurant";
        db.query(sql, callback);
    }

    getBestRestaurants(callback){
        var sql = "SELECT * from foodiesg_db.restaurant WHERE overall_rating = 5 ORDER BY overall_rating DESC LIMIT 5";
        db.query(sql, callback);

    }


    FoodType(keyword, callback) {
        var key = "%" + keyword + "%";
        var sql = "SELECT * from  foodiesg_db.restaurant where food_type like ?";
        db.query(sql, [key], callback);
    }

    Heading(keyword, callback) {
        var key = "%" + keyword + "%";
        var sql = "SELECT * from foodiesg_db.restaurant where heading like ?";
        db.query(sql, [key], callback);
    }

    SearchRestaurant(keyword, callback) {
        var key = "%" + keyword + "%";
        var sql = "SELECT * from foodiesg_db.restaurant where name like ?";
        db.query(sql, [key], callback);

    }
    
}

module.exports = RestaurantsDB;