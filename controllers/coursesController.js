const courses = require("../models/CourseModel");
const err = require("../utils/errorHandler");
const asyncHandler = require("../middlewares/asyncMiddleware");
const Bootcamp = require("../models/BootcampModel");
const ErrorResponse = require("../utils/errorHandler");

exports.getAllCourses = asyncHandler(async (req, res, next) => {
  if( req.params.BootcampId ){
    const course = courses.find( { bootcamp:req.params.BootcampId } );
    res.json({
      success:true,
      data:course
     })
   }else{res.status(200).json(res.advancedResult);
    }
});

exports.getSingleCourse = asyncHandler(async (req, res, next) => {
  let course = await courses.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description",
  });

  if (!course) {
    return next(new ErrorResponse("Nothing Found", 404));
  }

  res.status(404).json({
    success: true,
    data: course,
  });
});


exports.UpdateCourse = asyncHandler(async (req, res, next) => {
  let course = await courses.findByIdAndUpdate(req.params.id , req.body , {
    new:true ,
    runValidators:true,
   });


  res.status(404).json({
    success: true,
    data: course,
  });
});

exports.CreateCourse = asyncHandler(async (req, res, next) => {
  let course = await courses.create(req.body)

  res.status(404).json({
    success: true,
    data: course,
  });
});


exports.DeleteCourse = asyncHandler(async (req, res, next) => {
  await courses.findByIdAndDelete(req.params.id );



  res.status(404).json({
    success: true,
    data: {},
  });
});

