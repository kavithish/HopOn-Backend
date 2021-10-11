const mongoose = require("mongoose");

const RideSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: "User ID is required.",
  },
  userCluster: {
    type: Number,
    required: "Cluster number is required.",
  },
  tripStatus: {
    type: String,
    default: "open",
    enum: ["open", "closed", "cancelled", "finished"],
    required: true,
  },
  tripTime: {
    type: String,
  },
  tripDate: {
    type: String,
  },
  interests: {
    type: String,
  },
  preferences: {
    prefTalk: Boolean,
    prefSmoke: Boolean,
    prefPets: Boolean,
    prefMusic: Boolean,
  },
  pickAddress: {
    type: String,
    required: "Pick address is required.",
  },
  dropAddress: {
    type: String,
    required: "Drop address is required.",
  },
  pickMark: {
    latitude: String,
    longtitude: String,
  },

  dropMark: {
    latitude: String,
    longtitude: String,
  },

  passengers: [
    {
      userFirstName: String,
      userId: Number,
      startLat: String,
      startLong: String,
      amount: Number,
      distance: Number,
    },
  ],
  potentials: [
    {
      userFirstName: String,
      userId: Number,
      startLat: String,
      startLong: String,
      amount: Number,
      distance: Number,
    },
  ],
});

module.exports = {
  RideModel: mongoose.model("Ride", RideSchema),
};
