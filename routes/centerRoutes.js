const express = require("express");
const authController = require("./../controllers/authController");
const centerController = require("./../controllers/centerController");
const router = express.Router();

//not secure we have to use authController.restrict and protect in future
router.post("/create", authController.protect, centerController.createCenter);
router.post(
  "/update/:id",
  authController.protect,
  centerController.updateCenter
);
router.delete(
  "/delete/:id",
  authController.protect,
  centerController.deleteCenter
);
router.get("/", authController.protect, centerController.getAll);
router.get("/:id", authController.protect, centerController.getCenter);

module.exports = router;
