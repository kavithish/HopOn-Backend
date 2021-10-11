const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();
const { upload } = require("../../config/file-upload.configs");

//Add new user
router.post('/register', userController.register)

//Upload document
//router.post('/upload', userController.uploadfile)

//Authenticate a user
router.post('/authenticate', userController.authenticate)

//Get user info
router.get('/getinfo', userController.getinfo)

//Upload file
router.route("/upload").post(upload.single("file"), userController.fileUpload);

//View users
router.get("/users", userController.viewUsers);

//Update users
router.put("/users/update/:id", userController.updateUser);

module.exports = router;