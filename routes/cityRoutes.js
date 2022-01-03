const express = require("express");
const authController = require("./../controllers/authController");
const cityController = require("./../controllers/cityController");
const router = express.Router();

//not secure we have to use authController.restrict and protect in future
router.post("/create", authController.protect, cityController.createCity);
router.post("/update/:id", authController.protect, cityController.updateCity);
router.delete("/delete/:id", authController.protect, cityController.deleteCity);
router.get("/", authController.protect, cityController.getAll);
router.get("/:id", authController.protect, cityController.getCity);

module.exports = router;
