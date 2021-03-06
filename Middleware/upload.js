const multer = require('multer');
const express = require('express');
const routers = require('../routes/user.routers');



module.exports = (app) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/');
        },
        filename: (req, file, cb) => {
            console.log(file);
            cb(null, Date.now() + '_' + file.originalname);
        }
    });
    const fileFilter = (req, file, cb) => {


        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Allowed only .png, .jpg, and .jpeg'));
        }
    }
    const upload = multer({ storage: storage, fileFilter: fileFilter }).single('image');

    //Upload route
    app.post('/users/upload', upload, function (req, res, next) {
        try {

            return res.status(201).json({
                message: 'File uploded successfully',
            });
        } catch (error) {
            console.error(error);
        }
    });
}
