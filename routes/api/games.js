const express = require('express');
const router = express.Router();
const Games = require("../../models/Game");

router.get("/", (req,res) => {
    Games.find().then(s => res.json(s)).catch(err => console.log(err));
});

module.exports = router;