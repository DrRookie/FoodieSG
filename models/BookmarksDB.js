"use strict";

var db = require('../db-connections');

class BookmarksDB{
    getBookmarkFromUser(id_user, callback){
        var sql = "SELECT * from foodiesg_db.bookmark WHERE id_user = ?";
        db.query(sql, [id_user],callback);
    }

    addBookmark(bookmark, callback){
        var sql = "INSERT INTO bookmark (id_user, bookmarked_res, res_id) VALUES (?, ?, ?)";
        db.query(sql, [bookmark.getId_user(), bookmark.getBookmarked_res(), bookmark.getRes_id()], callback);
    }

    deleteBookmark(bookmark_id_, callback){
        var sql = "DELETE from bookmark WHERE bookmark_id_ = ?";
        return db.query(sql, [bookmark_id_], callback);
    }

    usersWhoBookmarkedSameRestaurant(bookmarked_res, callback){
        var sql = "SELECT bookmark.bookmarked_res, account_info.username, account_info.profile_pic FROM foodiesg_db.bookmark LEFT JOIN foodiesg_db.account_info ON id_user = user_id WHERE bookmark.bookmarked_res = ? LIMIT 3";
        return db.query(sql, [bookmarked_res], callback);
    }


     





}

module.exports = BookmarksDB;