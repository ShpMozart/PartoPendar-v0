const catchAsync = require("./../utils/catchAsync");
const multer = require("multer");
const File = require("./../models/File");
const User = require("./../models/User");
const Ticket = require("../models/Ticket");
File.belongsTo(User, { as: "senderUser", foreignKey: "senderId" });
File.belongsTo(Ticket, { as: "ticket", foreignKey: "ticketId" });
const create = async ({ ticketId, senderId, fileAddress }) => {
  return await File.create({
    ticketId,
    senderId,
    fileAddress,
  });
};
var storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(null, req.user.username + "-" + file.originalname);
  },
});
var upload = multer({ storage: storage });
exports.fields = upload.single("pdf");
exports.save = catchAsync(async (req, res, next) => {
  //console.log(req.file);
  let file = req.file;
  let name = file.filename;
  create({
    ticketId: req.body.ticketId,
    senderId: req.user.id,
    fileAddress: name,
  });
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
exports.downloadFile = catchAsync(async (req, res, next) => {
  const file = await File.findByPk(req.params.id);
  res.download(__dirname + "/../uploads/" + file.fileAddress);
});
