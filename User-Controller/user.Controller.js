const user = require('../Sevices-Controller/user-Service-Controller');
const report = require('../Sevices-Controller/report-Service-Controller');
const uploadimage = require('../Middleware/upload');
//User Register
module.exports.registration = async (req, res) => {
        const results = await user.registration(req.body);
        res.json(results);
};

// User Login
module.exports.login = async (req, res) => {
        const results = await user.login(req.body);
        res.json(results);
};


//Get All User 
module.exports.findAll = async (req, res) => {
        const results = await user.findAll(req.body);
        res.json(results);
};

//Delete User
module.exports.deleteuser = async (req, res) => {
        const results = await user.deleteuser(req.body);
        res.json(results);
};

//Update User 
module.exports.updatedetails = async (req, res) => {
        const results = await user.updatedetails(req.body, req.user.decoded);
        res.json(results);
};
//Get single User 
module.exports.finduser = async (req, res) => {
        const results = await user.finduser(req.body);
        res.json(results);
};

// User changepass
module.exports.changepassword = async (req, res) => {
        const results = await user.changepassword(req.body, req.user.decoded);
        res.json(results);
};

//Forget 
module.exports.forget = async (req, res) => {
        const results = await user.forget(req.body);
        res.json(results);
};

// ResetPassword
module.exports.resetpassword = async (req, res) => {
        const results = await user.resetpassword(req.body);
        res.json(results);
};

//All User Table Data Delete
module.exports.UserAlldelete = async (req, res) => {
        const results = await user.UserAlldelete(req.body);
        res.json(results);
};

//Find User B/W
module.exports.finduser_between = async (req, res) => {
        const results = await user.finduser_between(req.body);
        res.json(results);
}



/////////////Report Table Data////////////////

//Create  Table 
module.exports.createReport = async (req, res) => {
        const results = await report.createReport(req.body, req.user.decoded);
        res.json(results);
};

//Delete Report
module.exports.deletereport = async (req, res) => {
        const results = await report.deletereport(req.body);
        res.json(results);
};

//Find Report Data
module.exports.findreportdata = async (req, res) => {
        const results = await report.findreportdata(req.body);
        res.json(results);
};

//Report Count
module.exports.repoCount = async (req, res) => {
        const results = await report.repoCount(req.body);
        res.json(results);
};

//Delete all Report table data
module.exports.deleteAll = async (req, res) => {
        const results = await report.deleteAll(req.body);
        res.json(results);
};
