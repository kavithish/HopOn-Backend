const mongoose = require("mongoose");

const RatingSchema = mongoose.Schema({
    userId : {
        type : Number,
        required: "User Id is required..",
        unique: "User ID is already exists.."
    },
    rating_value : {
        type : Number,
        required: "Rating value is required.."
    },
    count : {
        type : Number,
        required: "Count is required.."
    },
    driver_count : {
        type : Number,
        required: "Driver count is required.."
    },
    passenger_count : {
        type : Number,
        required: "Passenger count is required.."
    },
    safety : {
        type : Number,
        required: "safety is required.."
    },
    friendliness: {
        type : Number,
        required: "friendliness is required.."
    },
    cleanliness : {
        type : Number
    },
    punctualness : {
        type : Number
    },
    comfortability : {
        type : Number
    },
    driving_behaviour : {
        type : Number
    },
    created_at: {
        type : Date,
        default : Date.now
    },
    updated_at: {
        type : Date
    }
});

module.exports = {
    "RatingModel" : mongoose.model("Rating" , RatingSchema)
}