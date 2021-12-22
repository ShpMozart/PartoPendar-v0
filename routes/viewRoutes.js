const express = require("express");
const authController = require("./../controllers/authController");
const viewsController = require("./../controllers/viewController");

const router = express.Router();

router.get("/", viewsController.login_get);
router.get("/panel", authController.protect, viewsController.panel_get);
module.exports = router;