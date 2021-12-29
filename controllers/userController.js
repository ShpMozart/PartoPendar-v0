const User = require("./../models/User");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.getAll = catchAsync(async (req, res, next) => {
  const user = await User.findAll({ where: req.query });
  res.status(200).json({
    status: "success",
    data: {
      users: user,
    },
  });
});
exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findByPk(req.params.id);
  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
exports.createUser = catchAsync(async (req, res, next) => {
  res.status(404).json({
    status: "failed",
    msg: "use /register instead of create",
  });
});
exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByPk(req.params.id);
  const newUser = await user.update(req.body);
  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      data: newUser,
    },
  });
});
exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByPk(req.params.id);
  await user.destroy();
  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
exports.getMe = (req, res, next) => {
  //req.params.id = req.user.id;
  const user = req.user;
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
};
