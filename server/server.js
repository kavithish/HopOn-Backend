const express = require("express");
const mongoose = require("mongoose");
const compression = require("compression");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const passport = require("passport");
const morgan = require("morgan");
const path = require("path");

// Import Config
const { mongoURI, port } = require("./config/config");

// Importing routes
const userRoute = require("./profiling/routes/user.route");
const rideRoute = require("./ride_recom/routes/ride.routes");
const fareRouter =  require('./fare_calculation/routes/fare.routes');
const ratingRoute = require("./user_rating/routes/rating.routes");

// Initialize
const app = express();

// Configuring middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(passport.initialize());
require("./passport")(passport);

// Configuring routes
app.use("/api/profiling", userRoute);
app.use("/api/ride", rideRoute.router);
app.use('/api/fares', fareRouter.router);
app.use("/api/rating" , ratingRoute.router);
app.use("/public", express.static(path.join(__dirname, "public")));

// Web route
app.get("/", (req, res) => {
  res.status(200).send("Hop On");
});

// Connect to database
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB Connection has established");
  })
  .catch((err) => {
    console.log(`Error Occur : ${err}`);
  });

// Start the server
app.listen(port, () => {
  console.log(`Server has start on port : ${port}`);
});