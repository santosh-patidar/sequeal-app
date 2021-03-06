const express = require('express');
const report = require('../Models/report.Model');
const userModel = require('../Models/user-Models');
const { sequelize } = require('sequelize');
const dbconnect = require('../config/db.connect');
const auth = require('../Middleware/auth-Token');




module.exports.createReport = (body, user) => {
    return new Promise(async (resolve, reject) => {
        try {
            // resolve(user)
            console.log(user.id);
            const data = {
                user_id: user.id,
                location: body.location,
                description: body.description,
            }
            // console.log(user);
            const createReport = await report.create(data)
            if (createReport) {
                resolve({
                    status: true,
                    statusCode: 200,
                    message: 'Create Report successfully....'
                });
            } else {
                resolve({
                    status: false,
                    statusCode: 409,
                    message: 'Report Create failed....'
                });
            }
        } catch (err) {
            console.log(err);
        }
    });
}

exports.deletereport = (body, token) => {
    console.log(body);
    return new Promise(async (resolve, reject) => {
        try {
            const data = body;
            const { id } = body;
            const deleterepo = await report.destroy({
                where: { id: id }
            })
            if (!deleterepo) {
                resolve({
                    status: false,
                    statusCode: 404,
                    msg: "report-data Not found"
                })
            } else {
                resolve({
                    status: true,
                    statusCode: 200,
                    msg: "report Delete successfully.."
                })
            }

        } catch (err) {
            console.log(err)
            resolve({
                status: false,
                status: 400,
                message: 'Unable to Delete data',
            })
        }
    })
}


exports.findreportdata = (body) => {
    return new Promise(async (resolve, reject) => {

        try {
            const getalldata = await report.findAll({ where: { deleted_at: null } }).then(data => {

                resolve({
                    status: true,
                    statusCode: 200,
                    msg: "Data fond..",
                    countData: data.length,
                    data: data,
                })


            })
        } catch (err) {
            console.log(err);
            resolve({
                status: false,
                statusCode: 404,
                msg: "data not found..!"
            })
        }
    })
}

module.exports.repoCount = (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            const Data = [];
            const getUser = await userModel.findAll({
                attributes: ['id', 'name', 'email', 'phone']
            })
            if (getUser) {
                for (let userLIst of getUser) {
                    const getReport = await report.findAll({
                        where: { user_id: userLIst.id },
                        attributes: ['user_id', 'location', 'description']
                    })
                    const data = {
                        id: userLIst.id,
                        name: userLIst.name,
                        email: userLIst.email,
                        phone: userLIst.phone,
                        report: getReport.length
                    }
                    Data.push(data)

                }

                resolve({
                    status: true,
                    statusCode: 200,
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


exports.deleteAll = () => {
    return new Promise(async (resolve, reject) => {
        try {

            const destroy = await report.destroy({
                where: {},
            });
            if (!destroy) {
                resolve({
                    status: false,
                    statusCode: 204,
                    msg: "report Already deleted...."
                });
            }
            else {
                resolve({
                    status: true,
                    statusCode: 200,
                    msg: "report were deleted successfully!",
                });
            }
        } catch (err) {
            console.log(err);
            resolve({
                status: false,
                statusCode: 400,
                message: "Some error occurred while removing all report"
            });
        }
    });
}


