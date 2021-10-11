var User = require('../models/user.model')
var jwt = require('jwt-simple')
var config = require('../../config/config')
const multer = require("multer");
const express = require('express')
const router = express.Router();
const passport = require('passport');
const axios = require("axios");

const fileUpload = (req, res) => {
    res.status(200).json({
        data: {
            filename: req.file.filename,
            supportdoc: req.file.path
        }
    });
}

const register = async (req , res) => {
    if ((!req.body.name) || (!req.body.dob) || (!req.body.gender) || (!req.body.email) || (!req.body.password) || (!req.body.workplace) || (!req.body.sector) || (!req.body.industry) || (!req.body.occupation) || (!req.body.education) || (!req.body.income) || (!req.body.music) || (!req.body.pets) || (!req.body.smoke) || (!req.body.luggage) || (!req.body.vmake) || (!req.body.vtype) || (!req.body.vmodel) || (!req.body.myear) || (!req.body.ryear) || (!req.body.cylinders) || (!req.body.fuel) || (!req.body.enginecc) || (!req.body.enginep) || (!req.body.mileage)) {
        res.json({success: false, msg: 'Enter all fields'})
    }
    else {
        var age, agegroup;
        const currentYear = new Date().getFullYear()
        age = currentYear - req.body.dob;

        if(age < 18){
            agegroup = 'a';
          }
          else if(age >= 18 && age <= 24){
            agegroup = 'b';
          }
          else if(age >= 25 && age <= 34){
            agegroup = 'c';
          }
          else if(age >= 35 && age <= 44){
            agegroup = 'd';
          }
          else if(age >= 45 && age <= 55){
            agegroup = 'e';
          }
          else if(age > 55){
            agegroup = 'f';
          }

          await axios
        .get(
          config.clusteringModel +
            `gender=${req.body.gender}&age=${agegroup}&sector=${req.body.sector}&industry=${req.body.industry}&education=${req.body.education}&income=${req.body.income}&make=${req.body.vmake}&type=${req.body.vtype}&model=${req.body.vmodel}`
        )
        .then((res) => {
          cluster = res.data;
          console.log("Cluster ID is: ", cluster);
        })
        .catch((err) => {
          console.log(err.status);
        });

        var newUser = User({
            uid: Date.now(),
            name: req.body.name,
            dob: req.body.dob,
            gender: req.body.gender,
            email: req.body.email,
            password: req.body.password,
            workplace: req.body.workplace,
            sector: req.body.sector,
            industry: req.body.industry,
            occupation: req.body.occupation,
            education: req.body.education,
            income: req.body.income,
            supportdoc: req.body.supportdoc,
            music: req.body.music,
            pets: req.body.pets,
            smoke: req.body.smoke,
            luggage: req.body.luggage,
            vmake: req.body.vmake,
            vtype: req.body.vtype,
            vmodel: req.body.vmodel,
            myear: req.body.myear,
            ryear: req.body.ryear,
            cylinders: req.body.cylinders,
            fuel: req.body.fuel,
            enginecc: req.body.enginecc,
            enginep: req.body.enginep,
            mileage: req.body.mileage,
            interests: req.body.interests,
            clusterid: cluster,
            verified: req.body.verified,
            logged: req.body.logged
        });
        newUser.save(function (err, newUser) {
            if (err) {
                res.json({success: false, msg: 'Failed to save'})
            }
            else {
                res.json({success: true, msg: 'Successfully saved'})
            }
        })
    }
};

const authenticate = async (req , res) => {
    User.findOne({
        email: req.body.email
    }, function (err, user) {
            if (err) throw err
            if (!user) {
                res.status(403).send({success: false, msg: 'Authentication failed, user not found'})
            }

            else {
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        var token = jwt.encode(user, config.secret)
                        res.json({success: true, token: token})
                    }
                    else {
                        return res.status(403).send({success: false, msg: 'Authentication failed, wrong password'})
                    }
                })
            }
    }
    )
};

const getinfo = async (req , res) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        var token = req.headers.authorization.split(' ')[1]
        var decodedtoken = jwt.decode(token, config.secret)
        return res.json({success: true, msg: 'Hello ' + decodedtoken.name})
    }
    else {
        return res.json({success: false, msg: 'No Headers'})
    }
};

const viewUsers = async (req , res) => {
    User.find().exec((err, users) => {
        if(err){
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: true,
            existingUsers: users
        });
    });
};

const updateUser = async (req , res) => {
    User.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        (err, user) => {
            if(err){
                return res.status(400).json({error: err});
            }
            return res.status(200).json({
                success: "Updated successfully"
            });
        }
    )
};

module.exports = {
    register,
    fileUpload,
    authenticate,
    getinfo,
    viewUsers,
    updateUser
}