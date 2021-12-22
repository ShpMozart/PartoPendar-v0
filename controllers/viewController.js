const path = require("path");
const catchAsync = require("./../utils/catchAsync");

exports.login_get = catchAsync(async (req, res, next) => {
  const showPath = path.join(__dirname + "/../public/login.html");
  res.sendFile(showPath);
});
exports.panel_get = catchAsync(async (req, res, next) => {
  const showPath = path.join(__dirname + "/../public/panel.html");
  res.sendFile(showPath);
});
exports.loader = catchAsync(async (req, res, next) => {
  const loader = path.join(__dirname + "/../public/loader.html");
  res.sendFile(loader);
});
