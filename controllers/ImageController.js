const multer = require("multer");
const asyncHandler = require("../middlewares/asyncMiddleware");
const ImageModel = require("../models/ImageModel");
//Storage

const Storage = multer.diskStorage({
  destination: "Images",
  filename: (req, file, cb) => {
    cb(null, Date.now + file.originalname);
  },
});

//Uploading

const Upload = multer({
  storage: Storage,
}).single("Image");

exports.postImg = asyncHandler((req, res) => {
  Upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      const Image = new ImageModel({
        name: req.body.name,
        Image: { data: req.file.filename, contentType: "image/jpeg" },
      });

      Image.save()
        .then(() => {
          res.status(200).json("Saved");
        })
        .catch((err) => {
          res.status(500).json("An Error Ocuuredd");
          console.log(err);
        });
    }
  });
});
