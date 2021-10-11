const axios = require("axios");
const { FareModel } = require("../models/fare.model");

//importing ML model
const { fuelconsmptionmodel } = require("../../config/config");

//fare calculation method implementation
const calculateFare = async (req, res) => {
  const yom = req.body.yom;
  const yor = req.body.yor;
  const cylinderCount = req.body.cylinderCount;
  const engineCapacity = req.body.engineCapacity;
  const power = req.body.power;
  const mileage = req.body.mileage;
  const passengerCount = req.body.passengerCount;
  const fuelType = req.body.fuelType;
  const distance = req.body.distance;

  if (fuelType === "petrol" || fuelType === "hybrid") {
    const fuelPrice = 157;
    if (fuelType === "petrol") {
      await axios
        .get(
          fuelconsmptionmodel +
            `0=${yom}&1=${yor}&2=${cylinderCount}&3=1&4=${engineCapacity}&5=${power}&6=${mileage}`
        )
        .then((res) => {
          fuelConsumption = res.data;
          console.log("FuelConsumption is: ", fuelConsumption);
          rideCost = (distance / fuelConsumption) * fuelPrice;
          //add maintenence cost as 20% of overall cost
          finalRideCost = (rideCost + rideCost/5);
          console.log("Final Ride Cost: ", finalRideCost);
          fareAmount = finalRideCost / passengerCount;
          console.log("FareAmount", fareAmount);
        })
        .catch((err) => {
          console.log(err.status);
        });
    } else {
      await axios
        .get(
          fuelconsmptionmodel +
            `0=${yom}&1=${yor}&2=${cylinderCount}&3=2&4=${engineCapacity}&5=${power}&6=${mileage}`
        )
        .then((res) => {
          fuelConsumption = res.data;
          console.log("FuelConsumption is: ", fuelConsumption);
          rideCost = (distance / fuelConsumption) * fuelPrice;
          //add maintenence cost as 20% of overall cost
          finalRideCost = (rideCost + rideCost/5);
          console.log("Final Ride Cost: ", finalRideCost);
          fareAmount = finalRideCost / passengerCount;
          console.log("FareAmount", fareAmount);
        })
        .catch((err) => {
          console.log(err.status);
        });
    }
  } else if (fuelType === "diesel") {
    const fuelPrice = 111;
    await axios
      .get(
        fuelconsmptionmodel +
          `0=${yom}&1=${yor}&2=${cylinderCount}&3=0&4=${engineCapacity}&5=${power}&6=${mileage}`
      )
      .then((res) => {
        fuelConsumption = res.data;
        console.log("FuelConsumption is: ", fuelConsumption);
        rideCost = (distance / fuelConsumption) * fuelPrice;
        //add maintenence cost as 20% of overall cost
        finalRideCost = (rideCost + rideCost/5);
        console.log("Final Ride Cost: ", finalRideCost);
        fareAmount = finalRideCost / passengerCount;
        console.log("FareAmount", fareAmount);
      })
      .catch((err) => {
        console.log(err.status);
      });
  } else {
    console.log("Invalid Fuel Type");
  }
  const fareData = {
    userId: req.body.userId,
    source: " ",
    destination: " ",
    distance: distance,
    fareAmount: fareAmount,
    rideCost: finalRideCost,
    costRangeLower: fareAmount,
    costRangeUpper: finalRideCost,
  };
  try {
    res.status(201).json({ data: fareData });
  } catch (err) {
    res.status(500).json({ err });
  }
};

//GET all fare details from DB
const getAllFares = async (req, res) => {
  try {
    const fares = await FareModel.find();
    res.status(200).json({ data: fares });
  } catch (err) {
    res.status(500).json({ err });
  }
};

//Save calculated fare details in DB
const createFare = async (req, res) => {
  const yom = req.body.yom;
  const yor = req.body.yor;
  const cylinderCount = req.body.cylinderCount;
  const engineCapacity = req.body.engineCapacity;
  const power = req.body.power;
  const mileage = req.body.mileage;
  const passengerCount = req.body.passengerCount;
  const fuelType = req.body.fuelType;
  const distance = req.body.distance;

  if (fuelType === "petrol" || fuelType === "hybrid") {
    const fuelPrice = 157;
    if (fuelType === "petrol") {
      await axios
        .get(
          fuelconsmptionmodel +
            `0=${yom}&1=${yor}&2=${cylinderCount}&3=1&4=${engineCapacity}&5=${power}&6=${mileage}`
        )
        .then((res) => {
          fuelConsumption = res.data;
          console.log("FuelConsumption is: ", fuelConsumption);
          rideCost = (distance / fuelConsumption) * fuelPrice;
          //add maintenence cost as 20% of overall cost
          finalRideCost = (rideCost + rideCost/5);
          console.log("Final Ride Cost: ", finalRideCost);
          fareAmount = finalRideCost / passengerCount;
          console.log("FareAmount", fareAmount);
        })
        .catch((err) => {
          console.log(err.status);
        });
    } else {
      await axios
        .get(
          fuelconsmptionmodel +
            `0=${yom}&1=${yor}&2=${cylinderCount}&3=2&4=${engineCapacity}&5=${power}&6=${mileage}`
        )
        .then((res) => {
          fuelConsumption = res.data;
          console.log("FuelConsumption is: ", fuelConsumption);
          rideCost = (distance / fuelConsumption) * fuelPrice;
          //add maintenence cost as 20% of overall cost
          finalRideCost = (rideCost + rideCost/5);
          console.log("Final Ride Cost: ", finalRideCost);
          fareAmount = finalRideCost / passengerCount;
          console.log("FareAmount", fareAmount);
        })
        .catch((err) => {
          console.log(err.status);
        });
    }
  } else if (fuelType === "diesel") {
    const fuelPrice = 111;
    await axios
      .get(
        fuelconsmptionmodel +
          `0=${yom}&1=${yor}&2=${cylinderCount}&3=0&4=${engineCapacity}&5=${power}&6=${mileage}`
      )
      .then((res) => {
        fuelConsumption = res.data;
        console.log("FuelConsumption is: ", fuelConsumption);
        rideCost = (distance / fuelConsumption) * fuelPrice;
        //add maintenence cost as 20% of overall cost
        finalRideCost = (rideCost + rideCost/5);
        console.log("Final Ride Cost: ", finalRideCost);
        fareAmount = finalRideCost / passengerCount;
        console.log("FareAmount", fareAmount);
      })
      .catch((err) => {
        console.log(err.status);
      });
  } else {
    console.log("Invalid Fuel Type");
  }
  const fareData = {
    userId: req.body.userId,
    source: " ",
    destination: " ",
    distance: distance,
    fareAmount: fareAmount,
  };

  try {
    const addedFare = await FareModel.create(fareData);
    res.status(201).json({ data: addedFare });
  } catch (err) {
    res.status(500).json({ err });
  }
};

//GET saved fare deiatls from DB by id
const getFare = async (req, res) => {
  try {
    const fare = await FareModel.findOne({ userId: req.params.id });

    if (fare) {
      res.status(200).json({ data: fare });
    } else {
      res.status(404).json({ errors: "No fare details found" });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
};

//DELETE fare details from DB by id
const deleteFare = async (req, res) => {
  try {
    const fare = await FareModel.findById(req.params.id);
    if (fare) {
      await FareModel.deleteOne(fare);
      res.status(204).json({ success: "Fare details were deleted!" });
    } else {
      res.status(404).json({ error: "No fare details found!" });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
};

module.exports = {
  calculateFare,
  getAllFares,
  getFare,
  createFare,
  deleteFare,
};
