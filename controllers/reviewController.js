"use strict";
const ReviewsDB = require('../models/ReviewsDB');
const Review = require('../models/Review');

var reviewsDB = new ReviewsDB();

function getAllReviews(request, respond){
    reviewsDB.getAllReviews(function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });

}

function getReviewOfEachUser(request, respond){
    var username = request.params.username;
    reviewsDB.getReviewOfEachUser(username, function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });

}

function addReview(request, respond){
    var now = new Date,
    nowFormat = [now.getFullYear(),
        now.getMonth()+1,
        now.getDate()].join('-')+' '+
       [now.getHours(),
        now.getMinutes(),
        now.getSeconds()].join(':');
    var review = new Review(null, request.body.restaurant_id, request.body.restaurant_name, request.body.review_qn_one, request.body.review_qn_two, request.body.username, request.body.picture, request.body.rating, nowFormat);
    reviewsDB.addReview(review, function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    })
}

function updateReview(request, respond){
    var now = new Date,
    nowFormat = [now.getFullYear(),
        now.getMonth()+1,
        now.getDate()].join('-')+' '+
       [now.getHours(),
        now.getMinutes(),
        now.getSeconds()].join(':');
    var review = new Review(parseInt(request.params.review_id), request.body.username, request.body.restaurant_id, request.body.restaurant_name, request.body.review_qn_one, request.body.review_qn_two, nowFormat, request.body.rating, request.body.picture);
    reviewsDB.updateReview(review, function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });
}

function deleteReview(request, respond){
    var reviewID = request.params.review_id;
    reviewsDB.deleteReview(reviewID, function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });
}




module.exports = {getAllReviews, addReview, deleteReview, updateReview, getReviewOfEachUser};