"use strict";

class Review {
    constructor(review_id, username, restaurant_id, restaurant_name, review_qn_one, review_qn_two, date_posted, rating, picture) {
        this.review_id = review_id;
        this.username = username;
        this.restaurant_id = restaurant_id;
        this.restaurant_name = restaurant_name;
        this.review_qn_one = review_qn_one;
        this.review_qn_two = review_qn_two;
        this.date_posted = date_posted;
        this.rating = rating;
        this.picture = picture;
    }

    getReview_id() {
        return this.review_id;
    }

    getUsername() {
        return this.username;
    }

    getRestaurant_id() {
        return this.restaurant_id;
    }

    getRestaurant_name() {
        return this.restaurant_name;
    }

    getReview_qn_one() {
        return this.review_qn_one;
    }

    getReview_qn_two() {
        return this.review_qn_two;
    }

    getDate_posted() {
        return this.date_posted;
    }

    getRating() {
        return this.rating;
    }

    getPicture() {
        return this.picture;
    }



    setReview_id(review_id) {
        this.review_id = review_id;
    }

    setUsername(username) {
        this.username = username;
    }

    setRestaurant_id(restaurant_id) {
        this.restaurant_id  = restaurant_id ;
    }

    setRestaurant_name(restaurant_name) {
        this.restaurant_name = restaurant_name;
    }

    setReview_qn_one(review_qn_one) {
        this.review_qn_one = review_qn_one;
    }

    setReview_qn_two(review_qn_two) {
        this.review_qn_two = review_qn_two;
    }

    setDate_posted(date_posted) {
        this.date_posted  = date_posted;
    }

    setRating(rating) {
        this.rating  = rating;
    }

    setPicture(picture) {
        this.picture  = picture;
    }

}

module.exports = Review;