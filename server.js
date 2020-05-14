const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const slider = require('./routes/api/slider');
const games = require('./routes/api/games');

const app = express();
app.listen(process.env.PORT || 5000, () => {
  console.log('Server started on port 5000');
});
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB CONNECTED'))
  .catch((err) => console.log(err));
app.set('view engine', 'ejs');
app.use(express.static('./public'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api/games', games);
app.use('/api/slider', slider);

app.get('/addGame', (req, res) => {
  res.render('addGame');
});

app.post('/addGame', (req, res) => {
  //Set storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      fs.mkdir(
        __dirname +
          `/client/public/images/${req.body.gameName.split(' ').join('')}`,
        (err) => {
          if (err) {
            console.log('err');
          } else {
            console.log(
              `Created a new directory: ${req.body.gameName
                .split(' ')
                .join('')}`
            );
          }
        }
      );

      cb(
        null,
        __dirname +
          `/client/public/images/${req.body.gameName.split(' ').join('')}`
      );
    },
    filename: (req, file, cb) => {
      cb(
        null,
        req.body.gameName.replace(':', '').split(' ').join('') +
          '_' +
          Date.now() +
          path.extname(file.originalname)
      );
    },
  });

  const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      checkFile(file, cb);
    },
  }).fields([
    {name: 'slideshowImages', maxCount: 12},
    {name: 'screenshots', maxCount: 12},
    {name: 'gameLogo'},
    {name: 'gameHCover'},
    {name: 'gameVCover'},
  ]);

  checkFile = (file, cb) => {
    const allowed = /png|jpg|jpeg|gif/;
    const extname = allowed.test(path.extname(file.originalname));
    const mimetype = allowed.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

  upload(req, res, (err) => {
    if (err) {
      res.render('addGame', {
        msg: err,
      });
    } else {
      if (
        req.body.gameName === '' ||
        req.body.smallDesc === '' ||
        req.body.aboutGame === '' ||
        req.body.developer === '' ||
        req.body.publisher === '' ||
        req.body.releaseDate === '' ||
        req.body.tags === '' ||
        req.body.rating === '' ||
        req.body.platform === ''
      ) {
        res.render('addGame', {
          msg: 'Fill all the fields !',
        });
      } else {
        console.log(req.files);

        let slideshowArray = [];
        if (req.files.slideshowImages !== 0) {
          req.files.slideshowImages.map((item) => {
            slideshowArray.push(item.filename);
          });
        }
        console.log('Images array added to database: ' + slideshowArray);

        let screenshotsArray = [];
        if (req.files.screenshots !== 0) {
          req.files.screenshots.map((item) => {
            screenshotsArray.push(item.filename);
          });
        }

        console.log('Screenshots array added to database: ' + screenshotsArray);
        const game = new Game({
          name: req.body.gameName,
          smallDesc: req.body.smallDesc,
          aboutGame: req.body.aboutGame,
          developer: req.body.developer,
          publisher: req.body.publisher,
          releaseDate: req.body.releaseDate,
          tags: req.body.tags,
          rating: req.body.rating,
          platform: req.body.platform,
          gamePrice: req.body.gamePrice,
          sale: (req.body.sale / 100) * req.body.gamePrice,
          isFree: req.body.isFree,
          gameLogoURL: req.files.gameLogo[0].filename,
          gameHCover: req.files.gameHCover[0].filename,
          gameVCover: req.files.gameVCover[0].filename,
          videoURL: req.body.iframeURL,
          imagesURL: slideshowArray,
          screenshotsURL: screenshotsArray,
        });
        game.save();
        res.render('addGame', {
          msg: 'Uploaded!',
        });
      }
    }
  });
});

app.get('/addSlide', (req, res) => {
  res.render('addSlide');
});

app.post('/addSlide', (req, res) => {
  //Set storage
  console.log(req.body.name);

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `client/public/images/${file.fieldname}`);
    },
    filename: (req, file, cb) => {
      cb(
        null,
        req.body.name.replace(':', '').split(' ').join('') +
          path.extname(file.originalname)
      );
    },
  });
  //CheckFileType
  checkFileType = (file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;

    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  //upload init

  const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      checkFileType(file, cb);
    },
  }).fields([{name: 'StoreSliderImg', maxCount: 1}]);

  upload(req, res, (err) => {
    if (err) {
      res.render('addSlide', {
        msg: err,
      });
    } else {
      if (req.file == 'undefined') {
        res.render('addSlide', {
          msg: 'Error:You need to choose a file',
        });
      } else {
        res.render('addSlide', {
          msg: 'Files Uploaded',
        });
        if (
          req.body.name === '' ||
          req.body.status === '' ||
          req.body.name === '' ||
          req.body.desc === '' ||
          req.body.linkName === '' ||
          req.body.linkURL === ''
        ) {
          res.render('addSlide', {
            error: 'Please fill all the fields !',
          });
        } else {
          const slider = new Slider({
            imgURL:
              '/images/StoreSliderImg' +
              '/' +
              req.body.name.replace(':', '').split(' ').join('') +
              req.files.StoreSliderImg[0].originalname.slice(
                req.files.StoreSliderImg[0].originalname.indexOf('.'),
                req.files.StoreSliderImg[0].originalname.length
              ),
            status: req.body.status,
            name: req.body.name,
            desc: req.body.desc,
            linkName: req.body.linkName,
            linkURL: req.body.linkURL,
          });
          slider.save();
        }
      }
    }
  });
});
app.get('/deleteGame', (req, res) => {
  res.render('deleteGame');
});

app.post('/deleteGame', (req, res) => {
  Game.deleteOne({name: req.body.name})
    .then((s) => console.log(s))
    .catch((err) => console.log(err));
  fs.rmdirSync(__dirname + '/client/public/images/' + req.body.name, {
    recursive: true,
  });
  res.redirect('/deleteGame');
});
app.get('/deleteSlide', (req, res) => {
  res.render('deleteSlider');
});

app.post('/deleteSlide', (req, res) => {
  const imageName = req.body.name.replace(':', '').split(' ').join('');
  Slider.find({name: req.body.name})
    .then((response) => {
      console.log(response);

      fs.unlink(`./client/public${response[0].imgURL}`, (err) => {
        if (err) {
          console.error(err);

          return;
        } else {
          console.log('Deleted image from StoreSliderImg: ' + imageName);
        }
      });
      fs.unlink(`./client/public${response[0].imgURLVertical}`, (err) => {
        if (err) {
          console.error(err);

          return;
        } else {
          console.log(
            'Deleted image from StoreSliderImgVertical: ' + imageName
          );
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });

  Slider.deleteOne({name: req.body.name}, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Successfully deleted data: ' + req.body.name);
    }
  });

  res.redirect('/deleteSlide');
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
