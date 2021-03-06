const express = require('express');
const { Sequelize } = require('sequelize');
const { sequelize, EmptyResultError } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../Models/user-Models');
const reportModel = require('../Models/report.Model');
// const UtilityHelper = require('../library/encrypt')();
const { mailerFun } = require('../Middleware/email.check');
const { mailerFunotp } = require('../Middleware/otp');
var { otpGenerator } = require('otp-generator');


'use strict';

module.exports.registration = function (body) {
    return new Promise(async (resolve, reject) => {
        try {
            const { name, email, password, phone } = body;
            const hash = await bcrypt.hash(password, 10);
            const data = {
                name: name,
                email: email,
                password: hash,
                phone: phone,
            }
            mailerFun(data)
            const ExistUser = await userModel.findOne({
                where: { email: email }
            })
            if (ExistUser == null || ExistUser == '') {
                const newUser = await userModel.create(data)
                if (newUser) {
                    resolve({
                        status: true,
                        statusCode: 200,
                        data: data,
                        message: 'User registred sucess..!'
                    });
                } else {
                    resolve({
                        status: false,
                        statusCode: 409,
                        message: 'registred failed....!'
                    })
                }
            }
            else {
                resolve({
                    status: false,
                    statusCode: 409,
                    msg: " Email already exist....!"
                });
            }
        } catch (err) {
            console.log(err);
        }
    })
}

module.exports.login = function (body) {
    return new Promise(async (resolve, reject) => {
        try {
            const { email, password } = body;
            const veriUser = await userModel.findOne({
                where: { email: email, deleted_at: null }
            })
            if (!veriUser) {
                resolve({
                    status: false,
                    statusCode: 409,
                    msg: "Email does not Found..!"
                })
            } else {
                const { id, email, phone, status } = veriUser
                const isMatch = await bcrypt.compare(password, veriUser.password)
                // console.log(isMatch);
                if (isMatch == true) {
                    const token = jwt.sign({ id: id, email: email, phone: phone }, 'topsecret', { expiresIn: '8h' });
                    const payload = {
                        id: id,
                        email: email,
                        phone: phone,
                    }
                    resolve({
                        status: true,
                        statusCode: 200,
                        msg: 'Login successfully...',
                        user_info: payload,
                        token: token,

                    })
                } else {
                    console.log(veriUser.email)
                    resolve({
                        status: false,
                        statusCode: 409,
                        msg: 'password does not match......!'
                    })
                }
            }
        } catch (err) {
            console.log(err);
        }
    })
}



exports.findAll = function (body) {
    return new Promise(async (resolve, reject) => {
        try {

            const getdata = await userModel.findAll({ where: { deleted_at: null } }).then(data => {

                resolve({
                    status: true,
                    statusCode: 200,
                    countData: data.length,
                    data: data
                })
            });
        }
        catch (err) {
            resolve({
                status: false,
                statusCode: 409,
                msg: "data Not Found!" + err
            })

        }
    })
}
exports.updatedetails = (body, user) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { name, phone } = body;
            const { id, email } = user
            const veriUser = await userModel.findOne({ where: { id: id, deleted_at: null } });

            if (!veriUser) {
                resolve({
                    status: false,
                    statusCode: 409,
                    msg: "This User id does not exist "
                });
            } else {
                let data1 = { name: name, phone: phone };

                const updateuser = await userModel.update(data1, {
                    where: { id: id, deleted_at: null }
                });
                if (!updateuser) {
                    resolve({
                        status: false,
                        statusCode: 404,
                        msg: "No data found"
                    })
                } else {
                    resolve({
                        status: true,
                        statusCode: 200,
                        msg: "Data update succesfully.."
                    })
                    console.log(data);
                }
            }
        }
        catch (err) {
            console.log(err);
            resolve({
                status: false,
                message: 'Unable to update data',
                errors: err,
                statusCode: 400
            })
        }

    })
}

exports.deleteuser = (body) => {
    console.log(body);
    return new Promise(async (resolve, reject) => {
        // console.log(body)
        try {
            // const data = body;
            const { id } = body;
            const deleteuser = await userModel.findOne({
                where: { id: id }
            })
            if (!deleteuser) {
                resolve({
                    status: false,
                    statusCode: 404,
                    msg: "No data found..!"
                });
            }
            else {
                const data = {
                    deleted_at: new Date()
                }
                const update = await userModel.update(data, {
                    where: { id: id }
                });
                if (update) {
                    resolve({
                        status: true,
                        statusCode: 200,
                        msg: "Data Delete successfully .."
                    })
                }
                else {

                    resolve({
                        status: true,
                        statusCode: 404,
                        msg: "Something went wrong......"
                    });
                }
            }
        }
        catch (err) {
            console.log(err);
            resolve({
                message: 'Unable to Delete data',
                status: 400
            })
        }
    })
}

exports.finduser = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = body;
            const { id, email, name, phone, password } = body;
            const checkUser = await userModel.findOne({
                where: { id: id, deleted_at: null }
            });

            if (!checkUser) {
                resolve({
                    status: false,
                    statusCode: 409.,
                    msg: "user not found"
                });
            }
            else {
                const verifyuser = await userModel.findOne(
                    {
                        where: { id: id, deleted_at: null }
                    });
                if (!verifyuser) {
                    resolve({
                        status: false,
                        statusCode: 404,
                        msg: "data not found"
                    })
                }
                else {
                    resolve({
                        status: true,
                        statusCode: 200,
                        data: checkUser,
                        msg: "data get successfully..."
                    })
                }
            }
        }
        catch (err) {
            console.log(err);
            resolve({
                status: false,
                message: 'Unable to upadte user',
                errors: err,
                statusCode: 400,
            })
        }
    })

}


module.exports.changepassword = (body, token) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { oldpassword, password, confirmpassword } = body;
            var finding = await userModel.findOne({

                where: { email: token.email }

            });
            if (!finding) {
                resolve({
                    status: false,
                    statusCode: 409,
                    msg: " user does not exist...",
                });
            } else {
                const { id, email } = finding;
                const Match = await bcrypt.compare(oldpassword, finding.password);
                if (Match == true) {
                    if (password === confirmpassword) {
                        // console.log(password);
                        const hash = await bcrypt.hash(password, 10);
                        // console.log(hash);      
                        let data = { password: hash };
                        console.log(data);
                        var updatepass = userModel.update(data, {
                            where: { email: token.email },
                        });
                    }
                    if (!updatepass) {
                        resolve({
                            status: false,
                            statusCode: 409,
                            message: "Please Check Password, Password is not Metch ",
                        });
                    } else {
                        resolve({
                            status: true,
                            statusCode: 200,
                            message: " Your password is update successfully..",

                        });
                    }
                } else {
                    resolve({
                        status: false,
                        statusCode: 409,
                        message: "old password is Not Match...!",
                    });
                }
            }
        } catch (err) {
            console.error(err);
            throw err;
        }
    });
};


module.exports.forget = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { email } = body;
            console.log(email);
            const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false, digits: true, alphabets: false });
            const tempData = { email: email, otp: otp }
            const userdata = await userModel.findOne({
                where: { email: email }
            });
            if (!userdata) {
                resolve({
                    status: false,
                    statusCode: 404,
                    msg: "Please Enter Valide Email"
                })
            } else {
                const user = await userModel.update(tempData, {
                    where: { email: email }
                });
                if (!user) {
                    resolve({
                        status: false,
                    })
                }
                else {
                    mailerFunotp(tempData);
                    resolve({
                        status: true,
                        statusCode: 200,
                        msg: "Otp send successfully...",
                        data: tempData.email
                    })
                }
            }

        }
        catch (err) {
            console.log(err);
        }

    })

}

module.exports.resetpassword = (body) => {

    return new Promise(async (resolve, reject) => {
        try {

            const { email, password, otp } = body;
            const reset = await userModel.findOne({
                where: {
                    email: email
                }
            })

            if (!reset) {
                resolve({
                    status: false,
                    statusCode: 404,
                    msg: "Email not found...!"
                })
            }
            else {
                // const { otp } = reset
                var isMatch = await userModel.findOne({
                    where: {
                        otp: otp
                    }
                });
                if (!isMatch) {
                    resolve({
                        status: false,
                        statusCode: 409,
                        msg: " Please Enter valide otp.... "
                    });
                }
                else {
                    const hash = await bcrypt.hash(password, 10);
                    console.log(hash);
                    const data = {
                        password: hash,
                        verify: 'True',
                    }
                    const update = await userModel.update(data, {
                        where: { email: email }
                    })
                    if (!update) {
                        resolve({
                            status: false,
                            statusCode: 404,
                            msg: "something went Wrong..!"
                        })
                    }
                    else {
                        resolve({
                            status: true,
                            statusCode: 200,
                            msg: "Password Reset successfully..."
                        })
                    }

                }
            }
        } catch (err) {
            console.log(err);
        }
    })
}


module.exports.UserAlldelete = () => {

    return new Promise(async (resolve, reject) => {
        try {

            const deletedata = await userModel.destroy({
                where: {},

            });
            if (!deletedata) {
                resolve({
                    status: false,
                    statusCode: 404,
                    msg: "Something went wrong...!!"
                });
            } else {
                resolve({
                    status: true,
                    statusCode: 200,
                    msg: "user table All data deleted.."
                });
            }
        } catch (err) {
            console.log(err);
            resolve({
                status: false,
                statusCode: 400,
                message: "Unable to Delete.."
            });
        }
    });

}

module.exports.finduser_between = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            const Op = Sequelize.Op
            const Data = [];
            const getUser = await userModel.findAll({
                where: {
                    id: {
                        [Op.between]: [body.id[0], body.id[1]]
                    }
                },
                attributes: ['id', 'name', 'email']
            });
            if (getUser) {
                for (let finduser_between of getUser) {
                    const getReport = await reportModel.findAll({
                        where: { user_id: finduser_between.id },
                        attributes: ['user_id', 'location', 'description']
                    });
                    const data = {
                        id: finduser_between.id,
                        name: finduser_between.name,
                        email: finduser_between.email,
                        report: getReport.length
                    }
                    Data.push(data)
                }
                resolve({
                    status: true,
                    statusCode: 200,
                    msg: "DATA FOUND...",
                    data: Data
                })
            } else {
                resolve({
                    status: false,
                    statusCode: 409,
                    message: 'Report not found....'
                })
            }
        } catch (err) {
            console.log(err);
        }
    })
}