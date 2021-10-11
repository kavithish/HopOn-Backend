const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const fareSchema =  new Schema({
    userId : {
        type: Number,
        required: true
    },
    source : {
        type: String,
        required: true
    },
    destination : {
        type: String,
        required: true
    },
    distance: {
        type: String,
        required: true
    },
    fareAmount: {
        type : Number,
        required: true
    }, 
},{
    timestamps: true
});

module.exports = {
    "FareModel" : mongoose.model("Fare" , fareSchema)
}
