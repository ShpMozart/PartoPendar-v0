const express = require("express");
const authController = require("./../controllers/authController");
const viewsController = require("./../controllers/viewController");

const router = express.Router();
//authController.isLoggedIn,
router.get("/", authController.isLoggedIn, viewsController.login_get);
router.get("/panel", authController.protect, viewsController.panel_get);
router.get("/panel/1", viewsController.login_get);
router.get("/req", viewsController.showTickets);
router.get("/req/:id", viewsController.showTicket);
router.get("/newReq", viewsController.newRequest);
router.get("/clientReq", viewsController.clientRequest);
router.get("/clientReq/:id", viewsController.customerProccessingTicket);
router.get("/acceptCus/:id", viewsController.acceptCus);
router.get("/sentTicket/:id", viewsController.sentTicket);

module.exports = router;
