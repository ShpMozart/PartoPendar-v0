const Center = require("./../models/Center");
const City = require("./../models/City");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

//Center.sync({ force: true });
Center.belongsTo(City, { as: "centers", foreignKey: "cityId" });

const createCenter = async ({ cityId, center }) => {
  return await Center.create({
    cityId,
    center,
  });
};

exports.getAll = catchAsync(async (req, res, next) => {
  const center = await Center.findAll({ where: req.query });
  res.status(200).json({
    status: "success",
    data: {
      centers: center,
    },
  });
});
exports.getCenter = catchAsync(async (req, res, next) => {
  const center = await Center.findByPk(req.params.id);
  if (!center) {
    return next(new AppError("No center found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      center,
    },
  });
});
exports.createCenter = catchAsync(async (req, res, next) => {
  createCenter({
    cityId: req.body.cityId,
    center: req.body.center,
  }).then((center) => {
    res.status(201).json({
      status: "success",
      center,
    });
  });
});
exports.updateCenter = catchAsync(async (req, res, next) => {
  const center = await Center.findByPk(req.params.id);
  const newcenter = await center.update(req.body);
  if (!center) {
    return next(new AppError("No city found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      data: newcenter,
    },
  });
});
exports.deleteCenter = catchAsync(async (req, res, next) => {
  const center = await Center.findByPk(req.params.id);
  await center.destroy();
  if (!center) {
    return next(new AppError("No center found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
