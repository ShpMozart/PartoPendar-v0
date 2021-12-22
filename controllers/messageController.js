const Message = require("./../models/Message");
const Ticket = require("./../models/Ticket");
const User = require("./../models/User");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
Message.sync({ force: true });
Message.belongsTo(Ticket, { as: "Message", foreignKey: "ticketId" });
Message.belongsTo(User, { as: "senderUser", foreignKey: "senderId" });
Message.belongsTo(User, { as: "recieverUser", foreignKey: "recieverId" });

exports.getAll = catchAsync(async (req, res, next) => {
  const ticket = await Ticket.findAll();

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

const createMessage = async ({ ticketId, senderId, recieverId, text }) => {
  return await Message.create({
    ticketId,
    senderId,
    recieverId,
    text,
  });
};
exports.createMessage = catchAsync(async (req, res, next) => {
  createMessage({
    ticketId: req.body.ticketId,
    senderId: req.user.id,
    recieverId: req.body.recieverId,
    text: req.body.text,
  }).then((message) => {
    res.status(201).json({
      status: "success",
      message,
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
