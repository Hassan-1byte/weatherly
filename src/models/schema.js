const mongoose = require("mongoose");

const weatherlySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  message: {
    type: String,
    required: true,
  },
});

// Now we need to Create a Collection.

const WeatherlyCollection = new mongoose.model(
  "WeatherlyCollection",
  weatherlySchema
);
module.exports = WeatherlyCollection;
