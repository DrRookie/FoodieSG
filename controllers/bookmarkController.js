"use strict";
const Bookmark = require('../models/Bookmark');
const BookmarksDB = require('../models/BookmarksDB');

var bookmarksDB = new BookmarksDB();

function getBookmarkFromUser(request, respond){
    var id_user = request.params.id_user;
    bookmarksDB.getBookmarkFromUser(id_user, function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });

}

function addBookmark(request, respond){
    var bookmark = new Bookmark(null, request.body.id_user, request.body.bookmarked_res, request.body.res_id);
    bookmarksDB.addBookmark(bookmark, function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    })
}


function deleteBookmark(request, respond){
    var bookmark_id_ = request.params.bookmark_id_;
    bookmarksDB.deleteBookmark(bookmark_id_, function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });
}


function usersWhoBookmarkedSameRestaurant(request, respond){
    var bookmarked_res = request.body.bookmarked_res;
    bookmarksDB.usersWhoBookmarkedSameRestaurant(bookmarked_res, function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });
}

module.exports = {getBookmarkFromUser, addBookmark, deleteBookmark, usersWhoBookmarkedSameRestaurant};