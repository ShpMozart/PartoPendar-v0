const express = require("express");
const authController = require("./../controllers/authController");
const ticketController = require("./../controllers/ticketController");
const fileController = require("./../controllers/fileController");
const viewsController = require("./../controllers/viewController");

const router = express.Router();

//not secure we have to use authController.restrict and protect in future

/*
fileController.fields,
fileController.save,
*/
router.post(
  "/create",
  authController.protect,
  authController.restrictTo("admin", "client"),
  ticketController.createTicket
);
router.get("/", fileController.showReq, ticketController.getAll);
router.get(
  "/clientTicket",
  authController.protect,
  authController.restrictTo("client"),
  ticketController.getAllClientTicket
);
router.get(
  "/workerTicket",
  authController.protect,
  authController.restrictTo("worker"),
  ticketController.getAllWorkerTicket
);
router.get("/:id", ticketController.getTicket);
router.post(
  "/update/:id",
  authController.protect,
  authController.restrictTo("boss", "admin"),
  ticketController.updateTicket
);
router.delete(
  "/delete/:id",
  authController.protect,
  authController.restrictTo("boss", "admin"),
  ticketController.deleteTicket
);

module.exports = router;
