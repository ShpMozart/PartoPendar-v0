const express = require("express");
const authController = require("./../controllers/authController");
const ticketController = require("./../controllers/ticketController");
const router = express.Router();

//not secure we have to use authController.restrict and protect in future
router.post("/create", authController.protect, ticketController.createTicket);
router.get("/", authController.protect, ticketController.getAll);
router.get(
  "/userTicket",
  authController.protect,
  ticketController.getAllUserTicket
);
router.get(
  "/workerTicket",
  authController.protect,
  ticketController.getAllWorkerTicket
);
router.get("/:id", authController.protect, ticketController.getTicket);
router.post(
  "/update/:id",
  authController.protect,
  ticketController.updateTicket
);
router.delete(
  "/delete/:id",
  authController.protect,
  ticketController.deleteTicket
);

module.exports = router;
