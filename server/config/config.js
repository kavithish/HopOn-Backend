const port = process.env.PORT || 8000;
const secret = 'secret';
const mongoURI = "mongodb+srv://kaveesha:12345@cluster0.prkrn.gcp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const clusteringModel ="https://cluster-model.herokuapp.com/api/clustering?";
const fuelconsmptionmodel = "https://fuelconsumption-model.herokuapp.com/api/FuelConsumption?"
const driverRatingApp ="https://driver-rating.herokuapp.com/api/driver/rating?constValue=1.0&";
const passengerRatingApp = "https://passenger-rating.herokuapp.com/api/passanger/rating?constValue=1.0&";

module.exports = {
    port,
    secret,
    mongoURI,
    clusteringModel,
    fuelconsmptionmodel,
    driverRatingApp,
    passengerRatingApp
}