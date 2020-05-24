const express = require('express');
const router = express.Router();
const Games = require('../../models/Game');

router.get('/', (req, res) => {
  Games.find(
    {},
    {
      name: 1,
      releaseDate: 1,
      developer: 1,
      publisher: 1,
      gamePrice: 1,
      gameVCover: 1,
      isFree: 1,
    }
  )
    .limit(5)
    .sort('-releaseDate')
    .then((response) => res.json(response))
    .catch((err) => console.log(err));
});

module.exports = router;
