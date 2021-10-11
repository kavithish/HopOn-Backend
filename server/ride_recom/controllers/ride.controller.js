const axios = require("axios");
const { RideModel } = require("../models/ride.model");

// Create Trip
exports.createTrip = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty." });
    return;
  }

  const passedRideData = new RideModel({
    userId: req.body.userId,
    userCluster: req.body.userCluster,
    tripTime: req.body.tripTime,
    tripDate: req.body.tripDate,
    tripStatus: "open",
    interests: req.body.interests,
    preferences: req.body.preferences,
    pickAddress: req.body.pickAddress,
    dropAddress: req.body.dropAddress,
    pickMark: req.body.pickMark,
    dropMark: req.body.dropMark,
    passengers: req.body.passengers,
    potentials: req.body.potentials,
  });

  try {
    const rideData = await RideModel.create(passedRideData);
    res.status(201).json({ rideData });
  } catch (err) {
    res.status(500).json({ errors: err });
  }
};

// Get Trips by User Cluster & "Open" Status
exports.findTripDetailsByCluster = async (req, res) => {
  try {
    const rideData = await RideModel.find({
      userCluster: req.params.cluster,
      tripStatus: "open",
    });
    res.status(200).json({ rideData });
  } catch (err) {
    res.status(500).json({ errors: err });
  }
};

// Get Trip Details by User ID & "Open"
exports.findTripDetailsByUserAndStatus = async (req, res) => {
  try {
    const rideData = await RideModel.find({
      userId: req.params.userid,
      tripStatus: "open" || "closed",
    });
    res.status(200).json({ rideData });
  } catch (err) {
    res.status(500).json({ errors: err });
  }
};

// Get Trip Details by Trip ID
exports.findTripDetailsById = async (req, res) => {
  try {
    const rideData = await RideModel.findOne({ _id: req.params.id });

    if (rideData) {
      res.status(200).json({ rideData });
    } else {
      res.status(404).json({ errors: "Trip not found." });
    }
  } catch (err) {
    res.status(500).json({ errors: err });
  }
};

// Add Passenger
exports.addPassenger = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Request body cannot be empty." });
  }

  const id = req.params.id;

  try {
    const rideData = await RideModel.findByIdAndUpdate(
      id,
      { $push: req.body },
      {
        useFindAndModify: false,
        new: true,
      }
    );
    if (rideData) {
      res.send({ rideData });
    } else {
      res.status(404).send({ message: "Trip not found." });
    }
  } catch (err) {
    res.status(500).send({ message: "Some error occured while updating" });
  }
};

// Remove Passenger (Drop Off)
exports.removePassenger = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Request body cannot be empty." });
  }

  const id = req.params.id;

  try {
    const rideData = await RideModel.findByIdAndUpdate(
      id,
      { $pull: req.body },
      {
        useFindAndModify: false,
        new: true,
      }
    );
    if (rideData) {
      res.send({ rideData });
    } else {
      res.status(404).send({ message: "Trip not found." });
    }
  } catch (err) {
    res.status(500).send({ message: "Some error occured while updating." });
  }
};

// Get Passenger Location by ID
exports.findPassengerById = async (req, res) => {
  try {
    const rideData = await RideModel.findOne({
      _id: req.params.id,
    }).select({ passengers: { $elemMatch: { userId: req.params.passid } } });

    if (rideData) {
      res.status(200).json({ data: rideData.passengers });
    } else {
      res.status(404).json({ errors: "Trip not found." });
    }
  } catch (err) {
    res.status(500).json({ errors: err });
  }
};

// Get Potentials Location by ID
exports.findPotentialById = async (req, res) => {
  try {
    const rideData = await RideModel.findOne({
      _id: req.params.id,
    }).select({ potentials: { $elemMatch: { userId: req.params.passid } } });

    if (rideData) {
      res.status(200).json({ data: rideData.potentials });
    } else {
      res.status(404).json({ errors: "Trip not found." });
    }
  } catch (err) {
    res.status(500).json({ errors: err });
  }
};

//Get All Passengers by Trip ID
exports.getAllPassengersByTrip = async (req, res) => {
  try {
    const rideData = await RideModel.findOne({ _id: req.params.id });
    if (rideData) {
      res.status(200).json({ data: rideData.passengers });
    } else {
      res.status(404).json({ errors: "Trip not found." });
    }
  } catch (err) {
    res.status(500).json({ errors: err });
  }
};

//Get All Potentials by Trip ID
exports.getAllPotentialsByTrip = async (req, res) => {
  try {
    const rideData = await RideModel.findOne({ _id: req.params.id });
    if (rideData) {
      res.status(200).json({ data: rideData.potentials });
    } else {
      res.status(404).json({ errors: "Trip not found." });
    }
  } catch (err) {
    res.status(500).json({ errors: err });
  }
};

// Close, End, Cancel Trip
exports.tripStatusUpdate = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Request body cannot be empty." });
  }

  const id = req.params.id;

  try {
    const rideData = await RideModel.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
      new: true,
    });
    if (rideData) {
      res.send({ rideData });
    } else {
      res.status(404).send({ message: "Trip not found." });
    }
  } catch (err) {
    res.status(500).send({ message: "Some error occured while updating" });
  }
};

// Call in the model
