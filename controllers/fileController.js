const catchAsync = require("./../utils/catchAsync");
const multer = require("multer");
const File = require("./../models/File");
const User = require("./../models/User");
const Ticket = require("../models/Ticket");
const Email = require("./../utils/email");

//File.sync({ force: true });

File.belongsTo(User, { as: "senderUser", foreignKey: "senderId" });
//File.hasOne(Ticket, { foreignKey: "fileId" });
const create = async ({ senderId, from, fileAddress }) => {
  return await File.create({
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
  if (!req.file) {
    return next();
  }
  let name = file.filename;
  create({
    senderId: req.user.id,
    from: req.user.role,
    fileAddress: name,
  }).then((file) => {
    req.fileId = file.id;
    res.status(200).json({
      data: file,
    });
    //next();
  });

  // new Email(
  //   JSON.stringify(`You have file from : ${req.user.username} `)
  // ).setup();
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
exports.showReq = catchAsync(async (req, res, next) => {
  next();
});
