const express = require('express');
const router = express.Router();

const Slides = require("../../models/Slider");

router.get("/", (req,res) => {
    Slides.find().then(s => res.json(s)).catch(err => console.log(err));
});

module.exports = router;