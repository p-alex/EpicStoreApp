const express = require('express');
const router = express.Router();

const Slides = require("../../models/Slider");

router.get("/", (req,res) => {
    Slides.find().then(g => res.json(g)).catch(err => console.log(err));
});

module.exports = router;