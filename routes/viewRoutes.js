const express = require("express");
const authController = require("./../controllers/authController");
const viewsController = require("./../controllers/viewController");

const router = express.Router();

router.get("/", authController.isLoggedIn, viewsController.login_get);
router.get("/panel", authController.protect, viewsController.panel_get);
router.get("/panel/1", viewsController.login_get);

module.exports = router;
