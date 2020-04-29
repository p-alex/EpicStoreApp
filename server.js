const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const multer = require("multer");
const path = require("path");

mongoose
  .connect("mongodb://localhost:27017/epicStoreDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB STARTED"))
  .catch((err) => console.log(err));
const app = express();
app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));
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

const Slider = mongoose.model("Slider", sliderSchema);
app.listen(process.env.PORT || 5000, () => {
  console.log("Server started on port 5000");
});
app.get("/addSlide", (req, res) => {
  res.render("addSlide");
  //   Slider.deleteOne({ name: "Industries Of Titan" }, (err) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log("deleted");
  //     }
  //   });
});

app.post("/addSlide", (req, res) => {
  //Set storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `client/public/images/${file.fieldname}`);
    },
    filename: (req, file, cb) => {
      cb(
        null,
        req.body.name.replace(":", "").split(" ").join("") +
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
  }).single("StoreSliderImg");

  upload(req, res, (err) => {
    if (err) {
      res.render("addSlide", {
        msg: err,
      });
    } else {
      if (req.file == "undefined") {
        res.render("addSlide", {
          msg: "Error:You need to choose a file",
        });
      } else {
        console.log(req.file);

        res.render("addSlide", {
          msg: "Files Uploaded",
        });
        const slider = new Slider({
          imgURL:
            "/images/StoreSliderImg" +
            "/" +
            req.body.name.replace(":", "").split(" ").join("") +
            req.file.originalname.slice(
              req.file.originalname.indexOf("."),
              req.file.originalname.length
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
  });

  //res.redirect("/addSlider");
});
app.get("/api/slider", (req, res) => {
  Slider.find()
    .then((response) => {
      res.json(response);
    })
    .catch((err) => console.log(err));
});

app.get("/deleteSlider", (req, res) => {
  res.render("deleteSlider");
});

app.post("/deleteSlider", (req, res) => {
  Slider.deleteOne({ name: req.body.name }, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully delete : " + req.body.name);
    }
  });
  res.redirect("/deleteSlider");
});