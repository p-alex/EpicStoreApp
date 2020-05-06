const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const slider = require("./routes/api/slider");
if(process.env.NODE_ENV === "production"){
  app.use(express.static("client/build"));
}
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB STARTED"))
  .catch((err) => console.log(err));
const app = express();
app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(process.env.PORT || 5000, () => {
  console.log("Server started on port 5000");
});
app.get("/addSlide", (req, res) => {
  
  res.render("addSlide");
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
  }).fields([
    {
      name: "StoreSliderImg",
      maxCount: 1,
    },
    { name: "StoreSliderImgVertical", maxCount: 1 },
  ]);

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
        res.render("addSlide", {
          msg: "Files Uploaded",
        });
        if (
          req.body.name === "" ||
          req.body.status === "" ||
          req.body.name === "" ||
          req.body.desc === "" ||
          req.body.linkName === "" ||
          req.body.linkURL === ""
        ) {
          res.render("addSlide", {
            error: "Please fill all the fields !",
          });
        } else {
          const slider = new Slider({
            imgURL:
              "/images/StoreSliderImg" +
              "/" +
              req.body.name.replace(":", "").split(" ").join("") +
              req.files.StoreSliderImg[0].originalname.slice(
                req.files.StoreSliderImg[0].originalname.indexOf("."),
                req.files.StoreSliderImg[0].originalname.length
              ),
            imgURLVertical:
              "/images/StoreSliderImgVertical" +
              "/" +
              req.body.name.replace(":", "").split(" ").join("") +
              req.files.StoreSliderImgVertical[0].originalname.slice(
                req.files.StoreSliderImgVertical[0].originalname.indexOf("."),
                req.files.StoreSliderImgVertical[0].originalname.length
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

app.get("/deleteSlide", (req, res) => {
  
  res.render("deleteSlider");
});

app.post("/deleteSlide", (req, res) => {
  const imageName = req.body.name.replace(":", "").split(" ").join("");
  Slider.find({name: req.body.name}).then(response => {
    console.log(response);
    
    fs.unlink(`./client/public${response[0].imgURL}` , err => {
      if(err){
        console.error(err);
       
        return;
      }else{
        console.log("Deleted image from StoreSliderImg: "+imageName);
       
      }
    });
    fs.unlink(`./client/public${response[0].imgURLVertical}`, err => {
      if(err){
        console.error(err);
      
        return;
      }else{
        console.log("Deleted image from StoreSliderImgVertical: "+imageName);
       
      }
    });
  }).catch(err => {
    console.log(err);
 
  });

  Slider.deleteOne({ name: req.body.name }, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully deleted data: " + req.body.name);
    }
  });  
  
  
  res.redirect("/deleteSlide");
});

app.use("/api/slider", slider);

if(process.env.NODE_ENV === "production"){
  app.use(express.static("client/build"));

  app.get("*", (req,res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
