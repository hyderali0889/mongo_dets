const ErrorResponse = require("../utils/errorHandler");

const errorHandler = (err, req, res, next) => {
  let error = {...err}

  error.message = err.message;

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    error = new ErrorResponse(`Resource not found ${err.value}`, 404);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = errorHandler;
