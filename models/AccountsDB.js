"use strict";

var db = require('../db-connections');

class AccountsDB{
    getAccountInfo(callback){
        var sql = "SELECT * from foodiesg_db.account_info";
        db.query(sql, callback);
    }

    getUser(username, callback){
        var sql = "SELECT distinct username,mobile_num,email,profile_pic,user_id from foodiesg_db.account_info WHERE username = ?";
        db.query(sql, [username], callback);
    }


    loginAccount(username, callback){
        var sql = "SELECT password from foodiesg_db.account_info WHERE username = ?";
        db.query(sql,[username], callback);
    }


    addAccount(username, password, first_name, last_name, gender, mobile_num, email, profile_pic, callback){
        var sql = "INSERT INTO account_info (username, password, first_name, last_name, gender, mobile_num, email, profile_pic) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        db.query(sql, [username,password, first_name, last_name, gender, mobile_num, email, profile_pic], callback);
    }

    updateAccount(mobile_num, email, profile_pic, username,callback){
        var sql = "UPDATE account_info SET mobile_num = ?, email = ?, profile_pic = ? WHERE username = ?";
        return db.query(sql, [mobile_num, email, profile_pic, username], callback);
    }

    deleteAccount(user_id, callback){
        var sql = "DELETE from account_info WHERE user_id = ?";
        return db.query(sql, [user_id], callback);
    }

    



}

module.exports = AccountsDB;