const Gozaresh = require("./../models/Gozaresh");

const User = require("./../models/User");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

//Gozaresh.sync({ force: true });

Gozaresh.belongsTo(User, { foreignKey: "userId" });

exports.getAll = catchAsync(async (req, res, next) => {
  const gozaresh = await Gozaresh.findAll({ where: req.query });

  res.status(200).json({
    status: "success",
    results: gozaresh.length,
    data: {
      gozaresh,
    },
  });
});
exports.getGozaresh = catchAsync(async (req, res, next) => {
  const gozaresh = await Gozaresh.findByPk(req.params.id);
  if (!gozaresh) {
    return next(new AppError("No gozaresh found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      gozaresh,
    },
  });
});
const createGozaresh = async ({ senderName, userId, month, date, tozihat }) => {
  return await Gozaresh.create({ senderName, userId, month, date, tozihat });
};
exports.createGozaresh = catchAsync(async (req, res, next) => {
  createGozaresh({
    senderName: req.user.username,
    userId: req.user.id,
    month: req.body.month,
    date: req.body.date,
    tozihat: req.body.tozihat,
  }).then((gozaresh) => {
    res.status(201).json({
      status: "success",
      gozaresh,
    });
  });
});
exports.updateGozaresh = catchAsync(async (req, res, next) => {
  const gozaresh = await Gozaresh.findByPk(req.params.id);
  const newGozaresh = await gozaresh.update(req.body);
  if (!gozaresh) {
    return next(new AppError("No gozaresh found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      data: newGozaresh,
    },
  });
});
exports.deleteGozaresh = catchAsync(async (req, res, next) => {
  const gozaresh = await Gozaresh.findByPk(req.params.id);
  await gozaresh.destroy();
  if (!gozaresh) {
    return next(new AppError("No gozaresh found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
