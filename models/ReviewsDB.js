"use strict";

var db = require('../db-connections');

class ReviewsDB{
    getAllReviews(callback){
        var sql = "SELECT * from foodiesg_db.reviews";
        db.query(sql, callback);
    }

    getReviewOfEachUser(username, callback){
        var sql = "SELECT restaurant_name, review_qn_one, review_qn_two, rating, date_posted FROM foodiesg_db.reviews WHERE username = ? ORDER BY date_posted DESC";
        db.query(sql, [username],callback);
    }

    addReview(review, callback){
        var sql = "INSERT INTO reviews (restaurant_id, restaurant_name, review_qn_one, review_qn_two, username, rating, date_posted, picture) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        db.query(sql, [review.getUsername(), review.getRestaurant_id(), review.getRestaurant_name().trim(), review.getReview_qn_one(), review.getReview_qn_two(), review.getRating(), review.getPicture(), review.getDate_posted()], callback);
    }

    updateReview(review, callback){
        var sql = "UPDATE reviews SET review_qn_one = ?, review_qn_two = ?, username = ?, rating = ?, date_posted = ?, picture = ? WHERE review_id = ?";
        return db.query(sql, [review.getReview_qn_one(), review.getReview_qn_two(), review.getUsername(), review.getRating(), review.getDate_posted(), review.getPicture(), review.getReview_id()], callback);
    }

    deleteReview(reviewID, callback){
        var sql = "DELETE from reviews WHERE review_id = ?";
        return db.query(sql, [reviewID], callback);
    }



}

module.exports = ReviewsDB;