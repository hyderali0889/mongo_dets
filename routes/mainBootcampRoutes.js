const express = require("express");
const router = express.Router();
const {
  createBootcamp,
  deleteBootcamp,
  getBootcamp,
  updateBootcamp,
  getSingleBootcamp,
} = require("../controllers/bootcampsController");

const advancedResults = require('../middlewares/advanceResults');
const bootcampModel = require('../models/BootcampModel');
const coursesRoute = require("./mainCourseRoutes");

// Rerouting into Other Resources Folder

router.use("/:bootcampId/courses", coursesRoute);

router.route("/").get(advancedResults(bootcampModel , 'Course'), getBootcamp).post(createBootcamp);

router
  .route("/:id")
  .put(updateBootcamp)
  .delete(deleteBootcamp)
  .get(getSingleBootcamp);


module.exports = router;
