const user = require("../models/User");
const asyncHandler = require("../middlewares/asyncMiddleware");

exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const userData = await user.find();

  res.status(200).json({
    success: true,
    data: userData,
  });
});

exports.registerUser = asyncHandler(async (req, res, next) => {
  const { userName, password, email, role } = req.body;

  const mainUser = await user.create({
    name: userName,
    email,
    password,
    role,
  });

  const token = mainUser.getJSONtoken();

  res.status(200).json({
    success: true,
    token,
  });
});
