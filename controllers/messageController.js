const Message = require("./../models/Message");
const Ticket = require("./../models/Ticket");
const User = require("./../models/User");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
Message.belongsTo(Ticket, { as: "ticket", foreignKey: "ticketId" });
// Message.belongsTo(User, { as: "senderUser", foreignKey: "senderId" });
// Message.belongsTo(User, { as: "recieverUser", foreignKey: "recieverId" });

exports.getAll = catchAsync(async (req, res, next) => {
  const message = await Message.findAll();

  res.status(200).json({
    status: "success",
    results: message.length,
    data: {
      message,
    },
  });
});
exports.getMessage = catchAsync(async (req, res, next) => {
  const message = await Message.findByPk(req.params.id);
  if (!message) {
    return next(new AppError("No ticket found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      message,
    },
  });
});
const createMessage = async ({ ticketId, from, text, factor }) => {
  return await Message.create({
    ticketId,
    from,
    text,
    factor,
  });
};
exports.createMessage = catchAsync(async (req, res, next) => {
  createMessage({
    ticketId: req.body.ticketId,
    from: req.body.from,
    text: req.body.text,
    factor: req.body.factor,
  }).then((message) => {
    res.status(201).json({
      status: "success",
      message,
    });
  });
});
exports.updateMessage = catchAsync(async (req, res, next) => {
  const message = await Message.findByPk(req.params.id);
  const newMessage = await message.update(req.body);
  if (!message) {
    return next(new AppError("No message found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      data: newMessage,
    },
  });
});
exports.deleteMessage = catchAsync(async (req, res, next) => {
  const message = await Message.findByPk(req.params.id);
  await message.destroy();
  if (!message) {
    return next(new AppError("No message found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
