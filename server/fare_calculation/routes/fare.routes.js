const express =  require("express");
const fareController = require("../controllers/fare.controller");
const router = express.Router();

router.route("/")
    .post(fareController.createFare)
    .get(fareController.getAllFares)
    
router.route("/:id")
    .get(fareController.getFare)
    .delete(fareController.deleteFare)

router.route("/calculateFare").post(fareController.calculateFare)

module.exports = {
    router
}