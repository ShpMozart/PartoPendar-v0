const Ticket = require("./../models/Ticket");
const User = require("./../models/User");
const APIFeatures = require("./../utils/apiFeatures");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const Message = require("../models/Message");

Ticket.belongsTo(User, { as: "senderUser", foreignKey: "senderId" });
Ticket.belongsTo(User, { as: "workerUser", foreignKey: "workerId" });
Ticket.hasMany(Message, { as: "message", foreignKey: "ticketId" });

exports.getAll = catchAsync(async (req, res, next) => {
  const ticket = await Ticket.findAll({
    where: req.query,
  });
  res.status(200).json({
    status: "success",
    results: ticket.length,
    data: {
      ticket,
    },
  });
});
exports.getTicket = catchAsync(async (req, res, next) => {
  const ticket = await Ticket.findByPk(req.params.id, {
    include: [
      {
        model: User,
        as: "senderUser",
        //attributes: ["username"],
      },
      {
        model: User,
        as: "workerUser",
        //attributes: ["username"],
      },
      {
        model: Message,
        as: "message",
        //attributes: ["username"],
      },
    ],
  });
  if (!ticket) {
    return next(new AppError("No ticket found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      ticket,
    },
  });
});
const createTicket = async ({
  senderId,
  workerId,
  senderName,
  city,
  center,
  title,
  text,
  file,
  status,
}) => {
  return await Ticket.create({
    senderId,
    workerId,
    senderName,
    city,
    center,
    title,
    text,
    file,
    status,
  });
};
exports.createTicket = catchAsync(async (req, res, next) => {
  createTicket({
    senderId: req.user.id,
    workerId: req.body.workerId,
    senderName: req.user.username,
    city: req.body.city,
    center: req.body.center,
    title: req.body.title,
    text: req.body.text,
    file: req.body.file,
    status: req.body.status,
  }).then((ticket) => {
    res.status(201).json({
      status: "success",
      ticket,
    });
  });
});
exports.updateTicket = catchAsync(async (req, res, next) => {
  const ticket = await Ticket.findByPk(req.params.id);
  const newTicket = await ticket.update(req.body);
  if (!ticket) {
    return next(new AppError("No user found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: newTicket,
    },
  });
});
exports.deleteTicket = catchAsync(async (req, res, next) => {
  const ticket = await Ticket.findByPk(req.params.id);
  await ticket.destroy();
  if (!ticket) {
    return next(new AppError("No ticket found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
