const express = require("express");
const authController = require("./../controllers/authController");
const ticketController = require("./../controllers/ticketController");
const router = express.Router();

//not secure we have to use authController.restrict and protect in future
router.post(
  "/create",
  authController.protect,
  authController.restrictTo("admin", "client"),
  ticketController.createTicket
);
router.get("/", ticketController.getAll);
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
router.get("/:id", authController.protect, ticketController.getTicket);
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
