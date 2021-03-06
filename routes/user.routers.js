const express = require('express');
const user = require('../User-Controller/user.Controller');
const { auth } = require('../Middleware/auth-Token');
const upload = require('../Middleware/upload');
const { mailerFun } = require('../Middleware/email.check');

module.exports = function (app) {

    //User Register
    app.post('/api/users', user.registration,);
    //User Login
    app.post('/api/users/login', user.login);
    //User All Data Find
    app.get('/api/users/findAll', auth, user.findAll);
    //User Update Details 
    app.put('/api/users/updatedetails', auth, user.updatedetails);
    //User Find
    app.post('/api/users/finduser', auth, user.finduser);
    //User Change Password
    app.post('/api/users/changepassword', auth, user.changepassword);
    //User Delete
    app.post('/api/users/deleteuser', auth, user.deleteuser);
    //User Forget By EMail and Reset Password Using OTP
    app.post('/api/users/forget', user.forget);
    app.post('/api/users/resetpassword', user.resetpassword);
    //Delete All User Table Data
    app.delete('/api/users/UserAlldelete', user.UserAlldelete);
    //Find User BetWeen 
    app.post('/api/users/finduser_between', user.finduser_between);


    ///////////////Report Table//////////////////////
    //Crete Report 
    app.post('/api/users/createReport', [auth], user.createReport);
    //Report Delete
    app.post('/api/users/deletereport', auth, user.deletereport);
    //Find Report
    app.get('/api/users/findreportdata', auth, user.findreportdata);
    //Report Count
    app.get('/api/users/repoCount', auth, user.repoCount);
    //All Report Data Delete
    app.delete('/api/users/deleteAll', auth, user.deleteAll);



}