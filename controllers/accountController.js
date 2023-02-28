"use strict";
const AccountsDB = require('../models/AccountsDB');
var bcrypt = require("bcryptjs"); 
var jwt = require("jsonwebtoken"); 
var secretKey = "chickenNoodle"


var accountsDB = new AccountsDB();

function getAccountInfo(request, respond){
    accountsDB.getAccountInfo(function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });

}

function addAccount(request, respond){
    var username = request.body.username;
    var password = request.body.password;
    password = bcrypt.hashSync(password, 10);
    var first_name = request.body.first_name;
    var last_name = request.body.last_name;
    var gender = request.body.gender;
    var mobile_num = request.body.mobile_num;
    var email = request.body.email;
    var profile_pic = request.body.profile_pic;


    accountsDB.addAccount(username, password, first_name, last_name, gender, mobile_num, email, profile_pic, function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });
}

function updateAccount(request, respond){
    
    var mobile_num = request.body.mobile_num;
    var email = request.body.email;
    var profile_pic = request.body.profile_pic;
    var token = request.body.token;
    try {
        var decoded = jwt.verify(token, secretKey);
        accountsDB.updateAccount(mobile_num, email, profile_pic,decoded,function(error, result){
            if(error){
                respond.json(error);
            }
            else{
                respond.json(result);
            }
        });
    } catch (error) {
        respond.json({result: "Invalid token"});

    }

}

function deleteAccount(request, respond){
    var user_id = request.params.user_id;
    accountsDB.deleteAccount(user_id, function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });
}

function loginAccount(request, respond){
    var username = request.body.username;
    var password = request.body.password;
    accountsDB.loginAccount(username, function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            const hash = result[0].password; // getting the hash password from the array of the JSON
            var flag = bcrypt.compareSync(password, hash) // compare the encrypted password with clear text password
            if (flag) {
                var token = jwt.sign(username, secretKey)
                respond.json({result: token});
            } else {
                respond.json({result: "Invalid"});
            }
            
        }
    });
}

function getUser(request, respond){
    var token = request.body.token;

    try {
        var decoded = jwt.verify(token, secretKey);
        accountsDB.getUser(decoded, function(error, result){
            if(error){
                respond.json(error);
            }
            else{
                respond.json(result);
            }
        });
       
    } catch (error) {
        respond.json({result: "Invalid token"});

    }

    
}






module.exports = {getAccountInfo, addAccount, updateAccount, deleteAccount, loginAccount, getUser};