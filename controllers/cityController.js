const City = require("./../models/City");
const Center = require("./../models/Center");

const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

//City.sync({ force: true });
City.hasMany(Center, { as: "centers", foreignKey: "cityId" });
const createCity = async ({ city }) => {
  return await City.create({
    city,
  });
};

exports.getAll = catchAsync(async (req, res, next) => {
  const city = await City.findAll({
    include: [
      {
        model: Center,
        as: "centers",
      },
    ],
  });
  res.status(200).json({
    status: "success",
    data: {
      cities: city,
    },
  });
});
exports.getCity = catchAsync(async (req, res, next) => {
  const city = await City.findByPk(req.params.id, {
    include: [{ model: Center }],
  });
  if (!city) {
    return next(new AppError("No city found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      city,
    },
  });
});
exports.createCity = catchAsync(async (req, res, next) => {
  createCity({
    city: req.body.city,
  }).then((city) => {
    res.status(201).json({
      status: "success",
      city,
    });
  });
});
exports.updateCity = catchAsync(async (req, res, next) => {
  const city = await City.findByPk(req.params.id);
  const newcity = await city.update(req.body);
  if (!city) {
    return next(new AppError("No city found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      data: newcity,
    },
  });
});
exports.deleteCity = catchAsync(async (req, res, next) => {
  const city = await City.findByPk(req.params.id);
  await city.destroy();
  if (!city) {
    return next(new AppError("No city found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
