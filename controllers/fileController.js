const catchAsync = require("./../utils/catchAsync");
const multer = require("multer");
const File = require("./../models/File");
const User = require("./../models/User");
const Ticket = require("../models/Ticket");
const Email = require("./../utils/email");

File.belongsTo(User, { as: "senderUser", foreignKey: "senderId" });
File.belongsTo(Ticket, { as: "ticket", foreignKey: "ticketId" });

const create = async ({ ticketId, senderId, from, fileAddress }) => {
  return await File.create({
    ticketId,
    senderId,
    from,
    fileAddress,
  });
};
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    const date = new Date();
    cb(
      null,
      req.user.username + "-" + date.toDateString() + "-" + file.originalname
    );
  },
});
const upload = multer({ storage: storage });
exports.fields = upload.single("pdf");
exports.save = catchAsync(async (req, res, next) => {
  let file = req.file;
  let name = file.filename;
  create({
    ticketId: req.body.ticketId,
    senderId: req.user.id,
    from: req.user.role,
    fileAddress: name,
  });
  new Email(
    JSON.stringify(`You have file from : ${req.user.username} `)
  ).setup();
  res.send("done");
});
exports.getFiles = catchAsync(async (req, res, next) => {
  const file = await File.findAll({
    where: req.query,
  });
  res.status(200).json({
    status: "success",
    results: file.length,
    data: {
      file,
    },
  });
});
exports.getFile = catchAsync(async (req, res, next) => {
  const file = await File.findByPk(req.params.id);
  res.download(__dirname + "/../uploads/" + file.fileAddress);
});
exports.downloadFile = catchAsync(async (req, res, next) => {
  const file = await File.findByPk(req.params.id);
  res.download(__dirname + "/../uploads/" + file.fileAddress);
});
