const express = require ('express');
const mongoose = require ('mongoose');
const bodyParser = require ('body-parser');
const ejs = require ('ejs');
const multer = require ('multer');
const path = require ('path');
const fs = require ('fs');
const slider = require ('./routes/api/slider');
const freeGames = require ('./routes/api/freeGames');
const newReleases = require ('./routes/api/newReleases');
const allGames = require ('./routes/api/allGames');
const dotenv = require ('dotenv').config ();

const app = express ();
app.listen (process.env.PORT || 5000, () => {
  console.log ('Server started on port 5000');
});
mongoose
  .connect (process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then (() => console.log ('MongoDB CONNECTED'))
  .catch (err => console.log (err));
app.set ('view engine', 'ejs');
app.use (express.static ('./public'));

app.use (bodyParser.urlencoded ({extended: true}));
app.use ('/api/freeGames', freeGames);
app.use ('/api/slider', slider);
app.use ('/api/newReleases', newReleases);
app.use ('/api/allGames', allGames);

if (process.env.NODE_ENV === 'production') {
  app.use (express.static ('client/build'));

  app.get ('*', (req, res) => {
    res.sendFile (path.resolve (__dirname, 'client', 'build', 'index.html'));
  });
}
