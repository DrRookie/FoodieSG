"use strict";
const CommentsDB = require('../models/CommentsDB');
const Comment = require('../models/Comment');

var commentsDB = new CommentsDB();

function getCommentFromReview(request, respond){
    commentsDB.getCommentFromReview(function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });

}

function addComment(request, respond){
    var now = new Date,
    nowFormat = [now.getFullYear(),
        now.getMonth()+1,
        now.getDate()].join('-')+' '+
       [now.getHours(),
        now.getMinutes(),
        now.getSeconds()].join(':');
    var comment = new Comment(null, request.body.user_name, request.body.comment, request.body.reviewID, nowFormat);
    commentsDB.addComment(comment, function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    })
}


function deleteComment(request, respond){
    var commentID = request.params.id_comments;
    commentsDB.deleteComment(commentID, function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });
}

module.exports = {getCommentFromReview, addComment, deleteComment};