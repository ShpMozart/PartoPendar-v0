const express = require("express");
const authController = require("./../controllers/authController");
const messageController = require("./../controllers/messageController");
const router = express.Router();

//not secure we have to use authController.restrict and protect in future
router.post("/create", authController.protect, messageController.createMessage);
router.post(
  "/update/:id",
  authController.protect,
  messageController.updateMessage
);
router.delete(
  "/delete/:id",
  authController.protect,
  messageController.deleteMessage
);
router.get("/", authController.protect, messageController.getAll);
router.get("/:id", authController.protect, messageController.getMessage);

module.exports = router;
