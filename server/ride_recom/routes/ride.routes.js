const express = require("express");
const router = express.Router();
const rideController = require("../controllers/ride.controller");

router.get("/", (req, res) => {
  res.status(200).send("RIDE BACKEND!");
});

// Create Trip
router.post("/", rideController.createTrip);

// Get Trips by Cluster ID
router.get("/cluster/:cluster", rideController.findTripDetailsByCluster);

// Get Trips by User ID and Status
router.get(
  "/user/status/:userid",
  rideController.findTripDetailsByUserAndStatus
);

// Get Trip Details by ID
router.get("/:id", rideController.findTripDetailsById);

//Find Passengers/Potentials by ID
router.get("/passenger/:id/:passid", rideController.findPassengerById);
router.get("/potentials/:id/:passid", rideController.findPotentialById);

// Get Passengers/Potentials by ID
router.get("/passengers/:id/", rideController.getAllPassengersByTrip);
router.get("/potentials/:id/", rideController.getAllPotentialsByTrip);

// Add Passengers/Potentials
router.put("/add/:id", rideController.addPassenger);

// Remove Passengers/Potentials
router.put("/remove/:id", rideController.removePassenger);

// Update Trip Status
router.put("/status/:id", rideController.tripStatusUpdate);

module.exports = {
  router,
};
