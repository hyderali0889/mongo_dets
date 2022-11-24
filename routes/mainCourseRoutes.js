const express = require("express");
const router = express.Router( {mergeParams : true} );
const {
  getAllCourses,
  getSingleCourse,
  DeleteCourse,
  UpdateCourse,
   CreateCourse
} = require("../controllers/coursesController");

const advancedResults = require( '../middlewares/advanceResults' );
const coursesModel = require('../models/CourseModel')



router.route("/").get(advancedResults(coursesModel ,{
  path:"bootcamp",
  select:'name description'
 }),getAllCourses).post(CreateCourse);

router.route("/:id").get(getSingleCourse).delete(DeleteCourse).put(UpdateCourse);


module.exports = router;

