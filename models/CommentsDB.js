"use strict";

var db = require('../db-connections');

class CommentsDB{
    getCommentFromReview(callback){
        var sql = "SELECT * from foodiesg_db.comments";
        db.query(sql, callback);
    }

    addComment(comment, callback){
        var sql = "INSERT INTO comments (user_name, comment, reviewID, date) VALUES (?, ?, ?, ?)";
        db.query(sql, [comment.getUser_name(), comment.getComment(), comment.getReviewID(), comment.getDate()], callback);
    }

    deleteComment(commentID, callback){
        var sql = "DELETE from comments WHERE id_comments = ?";
        return db.query(sql, [commentID], callback);
    }



}

module.exports = CommentsDB;