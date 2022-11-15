const bootcamps = require("../models/BootcampModel");
const err = require("../utils/errorHandler");
const asyncHandler = require("../middlewares/asyncMiddleware");
const BootcampModel = require("../models/BootcampModel");

exports.getBootcamp = asyncHandler(async (req, res, next) => {
  // Main Query to Execute
  let query;

  //adding req.query to an object
  let reqQuery = { ...req.query };

  // Adding $ to gt
  let queryStr = JSON.stringify(reqQuery);
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  // Parsing to JSON
  query = bootcamps.find(JSON.parse(queryStr));

  // Selecting a specifc keyword
  if (req.query.select) {
    let selecting = req.query.select.split(",").join(" ");
    query = query.select(selecting);
  }

  //Sorting The Result
  if (req.query.sort) {
    let sorting = req.query.sort.split(",").join(" ");
    query = query.sort(sorting);
  } else {
    query = query.sort("-createdAt");
  }

  // Adding Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 1;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const totalPages = await bootcamps.countDocuments();
  query = query.skip(startIndex).limit(limit);

  //Executing Query
  const bootcamp = await query;

  // pagination Results
  const pagination = {};

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit: limit,
    };
  }

  if (endIndex < totalPages) {
    pagination.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (!bootcamp) {
    next(new err("Cannot Find Bootcamps", 404));
  }

  res.json({
    success: true,
    count: bootcamp.length,
    pagination,
    Body: {
      data: bootcamp,
    },
  });
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
  const delet = await bootcamps.findByIdAndDelete(req.params.id);

  if (!delet) {
    next(new err("Cannot Find Bootcamp", 404));
  }
  res.json({
    success: true,
    Body: {
      data: {},
    },
  });
});
