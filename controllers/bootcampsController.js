const bootcamps = require("../models/BootcampModel");
const err = require("../utils/errorHandler");
const asyncHandler = require("../middlewares/asyncMiddleware");


exports.getBootcamp = asyncHandler(async (req, res, next) => {


  res.json(res.advancedResult);
});

exports.getSingleBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await bootcamps.findById(req.params.id);

  if (!bootcamp) {
    next(new err("Cannot Find Bootcamp", 404));
  }

  res.json({
    success: true,
    Body: {
      data: bootcamp,
    },
  });
});

exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp2 = await bootcamps.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bootcamp2) {
    next(new err("Cannot Find Bootcamp", 404));
  }

  res.json({
    success: true,
    Body: {
      data: bootcamp2,
    },
  });
});

exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const boot = await bootcamps.create(req.body);
  res.json({
    success: true,
    Body: {
      data: boot,
    },
  });
});

exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const delet = await bootcamps.findById(req.params.id);

  if (!delet) {
    next(new err("Cannot Find Bootcamp", 404));
  }

  delet.remove();
  res.json({
    success: true,
    Body: {
      data: {},
    },
  });
});
