const path = require("path");
const catchAsync = require("./../utils/catchAsync");
////////////////////UPDATE TO SHOW DIFFERENT PANELS TO USERS//////////////////////
exports.login_get = catchAsync(async (req, res, next) => {
  const showPath = path.join(__dirname + "/../public/htmls/login.html");
  res.sendFile(showPath);
});
exports.panel_get = catchAsync(async (req, res, next) => {
  const user = req.user;
  let showPath = path.join(__dirname + "/../public/password.html");
  if (!user.dataValues.passwordChanged) {
    return res.sendFile(showPath);
  } else {
    if (user.dataValues.role === "admin") {
      //panel admin
      showPath = path.join(__dirname + "/../public/htmls/panel-admin.html");
      return res.sendFile(showPath);
    } else if (user.dataValues.role === "boss") {
      //panel boss
      showPath = path.join(__dirname + "/../public/htmls/panel-admin.html");
      return res.sendFile(showPath);
    } else if (user.dataValues.role === "client") {
      //panel client
      showPath = path.join(__dirname + "/../public/htmls/panel-cust.html");
      return res.sendFile(showPath);
    } else if (user.dataValues.role === "worker") {
      //panel worker
      showPath = path.join(__dirname + "/../public/worker.html");
      return res.sendFile(showPath);
    }
  }
});
exports.loader = catchAsync(async (req, res, next) => {
  const loader = path.join(__dirname + "/../public/htmls/loader.html");
  res.sendFile(loader);
});
exports.showTickets = catchAsync(async (req, res, nex) => {
  const show = path.join(__dirname + "/../public/htmls/req.html");
  res.sendFile(show);
});
exports.showTicket = catchAsync(async (req, res, nex) => {
  const show = path.join(__dirname + "/../public/htmls/ticket.html");
  res.sendFile(show);
});
exports.newRequest = catchAsync(async (req, res, nex) => {
  const show = path.join(__dirname + "/../public/htmls/new-req.html");
  res.sendFile(show);
});
exports.clientRequest = catchAsync(async (req, res, nex) => {
  const show = path.join(__dirname + "/../public/htmls/req-cus.html");
  res.sendFile(show);
});
exports.acceptCus = catchAsync(async (req, res, nex) => {
  const show = path.join(__dirname + "/../public/htmls/accpt-cus.html");
  res.sendFile(show);
});
