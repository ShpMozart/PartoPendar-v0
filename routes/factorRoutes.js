const express = require("express");
const authController = require("./../controllers/authController");
const factorController = require("./../controllers/factorController");
const router = express.Router();

//not secure we have to use authController.restrict and protect in future
router.post(
  "/create",
  authController.protect,
  factorController.clearFactor,
  factorController.createFactor
);

router.get("/:id", authController.protect, factorController.getFactor);
router.post(
  "/update/:id",
  authController.protect,
  factorController.updateFactor
);
router.delete(
  "/delete/:id",
  authController.protect,
  factorController.deleteFactor
);
router.get("/", authController.protect, factorController.getAll);
module.exports = router;
