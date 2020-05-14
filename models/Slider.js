const mongoose = require('mongoose');
const sliderSchema = new mongoose.Schema({
    imgURL: {
      type: String,
      required: [true, "Add the image url for the slider"],
    },
    status: {
      type: String,
      required: [true, "Add the status of the slider"],
    },
    name: {
      type: String,
      required: [true, "Add the name of the slider"],
    },
    desc: {
      type: String,
      required: [true, "Add the desc of the slider"],
    },
    status: {
      type: String,
      required: [true, "Add the status of the slider"],
    },
    linkName: {
      type: String,
      required: [true, "Add the link name for the slider"],
    },
    linkURL: {
      type: String,
      required: [true, "Add the link url for the slider"],
    },
  });

  module.exports = Slider = mongoose.model("Slider", sliderSchema);