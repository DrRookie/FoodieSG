"use strict";

class Comment {
    constructor(id_comments, user_name, comment, reviewID, date) {
        this.id_comments = id_comments;
        this.user_name = user_name;
        this.comment = comment;
        this.reviewID = reviewID;
        this.date = date;
    }

    getId_comments() {
        return this.id_comments;
    }

    getUser_name() {
        return this.user_name;
    }

    getComment() {
        return this.comment;
    }

    getReviewID() {
        return this.reviewID;
    }
    getDate() {
        return this.date;
    }

    

    setId_comments(id_comments) {
        this.id_comments = id_comments;
    }

    setUser_name(user_name) {
        this.user_name = user_name;
    }

    setComment(comment) {
        this.comment  = comment;
    }

    setReviewID(reviewID) {
        this.reviewID = reviewID;
    }

    setDate(date) {
        this.date = date;
    }


}

module.exports = Comment;