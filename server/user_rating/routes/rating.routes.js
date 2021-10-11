const express = require("express");

const userRatingCtrl = require("../controllers/rating.controller");

const router = express.Router();

router.route("/")
    .post(userRatingCtrl.createUserRating)
    .get(userRatingCtrl.getAllUsersRatings)

router.route("/:id")
    .get(userRatingCtrl.getUserRatingByUserId)
    .put(userRatingCtrl.updateUserRating)
    .delete(userRatingCtrl.deleteUserRating)

module.exports = {
    router
}