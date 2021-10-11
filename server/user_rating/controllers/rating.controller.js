const axios = require("axios");

// Import the model
const { RatingModel } = require("../models/rating.model");

// Import Config
const { driverRatingApp, passengerRatingApp } = require("../../config/config");

// Create user rating instance for user in user rating table
const createUserRating = async (req, res) => {
  const ratingData = {
    userId: req.body.userId,
    rating_value: 0,
    count: 0,
    driver_count: 0,
    passenger_count: 0,
    safety: 0,
    friendliness: 0,
    cleanliness: 0,
    punctualness: 0,
    comfortability: 0,
    driving_behaviour: 0,
  };

  try {
    const createdRating = await RatingModel.create(ratingData);
    res.status(201).json({ data: createdRating });
  } catch (err) {
    res.status(500).json({ errors: err });
  }
};

// Get all users ratings
const getAllUsersRatings = async (req, res) => {
  try {
    const userRatings = await RatingModel.find();
    res.status(200).json({ data: userRatings });
  } catch (err) {
    res.status(500).json({ errors: err });
  }
};

// Get user rating By user id
const getUserRatingByUserId = async (req, res) => {
  try {
    const userRating = await RatingModel.findOne({ userId: req.params.id });

    if (userRating) {
      res.status(200).json({ data: userRating });
    } else {
      res.status(404).json({ errors: "User Not Found" });
    }
  } catch (err) {
    res.status(500).json({ errors: err });
  }
};

// Update user rating
const updateUserRating = async (req, res) => {
  if (
    req.body.safety ||
    req.body.safety == 0 ||
    req.body.friendliness ||
    req.body.friendliness == 0
  ) {
    // when adding new rating
    try {
      const userRating = await RatingModel.findOne({ userId: req.params.id });

      if (userRating) {
        var tem_count = userRating.count;
        tem_count = tem_count + 1;

        var tem_driver_count = userRating.driver_count;
        var tem_passenger_count = userRating.passenger_count;

        var rating_value_predicted = 0.0;

        if (
          req.body.comfortability ||
          req.body.comfortability == 0 ||
          req.body.driving_behaviour ||
          req.body.driving_behaviour == 0
        ) {
          tem_driver_count = tem_driver_count + 1;

          await axios
            .get(
              driverRatingApp +
                `friendlinessValue=${req.body.friendliness}&comfortabilityValue=${req.body.comfortability}&drivingBehaviourValue=${req.body.driving_behaviour}&safetyValue=${req.body.safety}`
            )
            .then((result) => {
              rating_value_predicted = result.data;
            })
            .catch((error) => {
              console.log(error);
            });
        }

        if (
          req.body.cleanliness ||
          req.body.cleanliness == 0 ||
          req.body.punctualness ||
          req.body.punctualness == 0
        ) {
          tem_passenger_count = tem_passenger_count + 1;

          await axios
            .get(
              passengerRatingApp +
                `friendlinessValue=${req.body.friendliness}&cleanlinessValue=${req.body.cleanliness}&punctualnessValue=${req.body.punctualness}&safetyValue=${req.body.safety}`
            )
            .then((result) => {
              rating_value_predicted = result.data;
            })
            .catch((error) => {
              console.log(error);
            });
        }

        const ratingData = {
          count: tem_count,
          driver_count: tem_driver_count,
          passenger_count: tem_passenger_count,
          rating_value: rating_value_predicted,
          safety: parseInt(req.body.safety),
          friendliness: parseInt(req.body.friendliness),
          cleanliness: parseInt(req.body.cleanliness),
          punctualness: parseInt(req.body.punctualness),
          comfortability: parseInt(req.body.comfortability),
          driving_behaviour: parseInt(req.body.driving_behaviour),
          updated_at: Date.now(),
        };

        var devided_count = ratingData.count == 1 ? 1 : 2;
        var driver_devided_count = ratingData.driver_count == 1 ? 1 : 2;
        var passenger_devided_count = ratingData.passenger_count == 1 ? 1 : 2;

        ratingData.rating_value = (
          (ratingData.rating_value + userRating.rating_value) /
          devided_count
        ).toFixed(2);

        if (req.body.safety || req.body.safety == 0) {
          ratingData.safety = (
            (ratingData.safety + userRating.safety) /
            devided_count
          ).toFixed(2);
        } else {
          delete ratingData.safety;
        }

        if (req.body.friendliness || req.body.friendliness == 0) {
          ratingData.friendliness = (
            (ratingData.friendliness + userRating.friendliness) /
            devided_count
          ).toFixed(2);
        } else {
          delete ratingData.friendliness;
        }

        if (req.body.cleanliness || req.body.cleanliness == 0) {
          ratingData.cleanliness = (
            (ratingData.cleanliness + userRating.cleanliness) /
            passenger_devided_count
          ).toFixed(2);
        } else {
          delete ratingData.cleanliness;
        }

        if (req.body.punctualness || req.body.punctualness == 0) {
          ratingData.punctualness = (
            (ratingData.punctualness + userRating.punctualness) /
            passenger_devided_count
          ).toFixed(2);
        } else {
          delete ratingData.punctualness;
        }

        if (req.body.comfortability || req.body.comfortability == 0) {
          ratingData.comfortability = (
            (ratingData.comfortability + userRating.comfortability) /
            driver_devided_count
          ).toFixed(2);
        } else {
          delete ratingData.comfortability;
        }

        if (req.body.driving_behaviour || req.body.driving_behaviour == 0) {
          ratingData.driving_behaviour = (
            (ratingData.driving_behaviour + userRating.driving_behaviour) /
            driver_devided_count
          ).toFixed(2);
        } else {
          delete ratingData.driving_behaviour;
        }

        let updatedUserRating = Object.assign(userRating, ratingData);
        updatedUserRating = await updatedUserRating.save();
        res.status(200).json({ data: updatedUserRating });
      } else {
        res.status(404).json({ errors: "User Not Found" });
      }
    } catch (err) {
      res.status(500).json({ errors: err });
    }
  } else {
    // When cancelling ride
    try {
      const userRating = await RatingModel.findOne({ userId: req.params.id });

      if (userRating) {
        var tem_rating_value = userRating.rating_value;
        tem_rating_value = (tem_rating_value - 5.0).toFixed(2);

        const ratingData = {
          rating_value: tem_rating_value,
        };

        let updatedUserRating = Object.assign(userRating, ratingData);
        updatedUserRating = await updatedUserRating.save();
        res.status(200).json({ data: updatedUserRating });
      } else {
        res.status(404).json({ errors: "User Not Found" });
      }
    } catch (err) {
      res.status(500).json({ errors: err });
    }
  }
};

// Delete user rating
const deleteUserRating = async (req, res) => {
  try {
    const userRating = await RatingModel.findOne({ userId: req.params.id });

    if (userRating) {
      await RatingModel.deleteOne({ userId: req.params.id });
      res.status(204).json({ data: {} });
    } else {
      res.status(404).json({ errors: "User Not Found" });
    }
  } catch (err) {
    res.status(500).json({ errors: err });
  }
};

module.exports = {
  createUserRating,
  getAllUsersRatings,
  getUserRatingByUserId,
  updateUserRating,
  deleteUserRating,
};
