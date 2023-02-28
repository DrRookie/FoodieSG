"use strict";

class Bookmark {
    constructor(bookmark_id_, id_user, bookmarked_res, res_id) {
        this.bookmark_id_ = bookmark_id_;
        this.id_user = id_user;
        this.bookmarked_res = bookmarked_res;
        this.res_id = res_id;
    }

    getBookmark_id_() {
        return this.bookmark_id_;
    }

    getId_user() {
        return this.id_user;
    }

    getBookmarked_res() {
        return this.bookmarked_res;
    }

    getRes_id() {
        return this.res_id;
    }
    

    setBookmark_id_(bookmark_id_) {
        this.bookmark_id_ = bookmark_id_;
    }

    setId_user(id_user) {
        this.id_user = id_user;
    }

    setBookmarked_res(bookmarked_res) {
        this.bookmarked_res  = bookmarked_res;
    }

    setRes_id(res_id) {
        this.res_id = res_id;
    }

}

module.exports = Bookmark;