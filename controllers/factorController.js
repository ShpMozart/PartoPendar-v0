const Ticket = require("./../models/Ticket");
const User = require("./../models/User");
const File = require("./../models/File");
const Factor = require("./../models/Factor");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const Message = require("../models/Message");
const Email = require("./../utils/email");
//Factor.sync({ force: true });

Factor.belongsTo(Ticket, { foreignKey: "ticketId" });

exports.getAll = catchAsync(async (req, res, next) => {
  const factor = await Factor.findAll({
    where: req.query,
  });
  res.status(200).json({
    status: "success",
    results: factor.length,
    data: {
      factor,
    },
  });
});

exports.getFactor = catchAsync(async (req, res, next) => {
  const factor = await Factor.findByPk(req.params.id);
  if (!factor) {
    return next(new AppError("No factor found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      factor,
    },
  });
});
const createFactor = async ({ ticketId, name, tedad, vahed, tozihat }) => {
  return await Factor.create({
    ticketId,
    name,
    tedad,
    vahed,
    tozihat,
  });
};

exports.createFactor = catchAsync(async (req, res, next) => {
  req.body.forEach((element) => {
    createFactor({
      ticketId: element.ticketId,
      name: element.name,
      tedad: element.tedad,
      vahed: element.vahed,
      tozihat: element.tozihat,
    });
  });
  res.status(201).json({
    status: "success",
  });
});

exports.updateFactor = catchAsync(async (req, res, next) => {
  const factor = await Factor.findByPk(req.params.id);
  const newFactor = await factor.update(req.body);
  if (!factor) {
    return next(new AppError("No user found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: newFactor,
    },
  });
});
exports.deleteFactor = catchAsync(async (req, res, next) => {
  const factor = await Factor.findByPk(req.params.id);
  await factor.destroy();
  if (!factor) {
    return next(new AppError("No factor found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
exports.clearFactor = catchAsync(async (req, res, next) => {
  await Factor.destroy({
    where: {
      ticketId: req.body[0].ticketId,
    },
  });
  next();
});
