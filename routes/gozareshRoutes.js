const express = require("express");
const authController = require("./../controllers/authController");
const gozareshController = require("./../controllers/gozareshController");
const router = express.Router();

//not secure we have to use authController.restrict and protect in future
router.post(
  "/create",
  authController.protect,
  gozareshController.createGozaresh
);
router.get("/", authController.protect, gozareshController.getAll);
module.exports = router;
