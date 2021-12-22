const express = require("express");
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");
const router = express.Router();

router.post("/register", authController.signup);
router.post("/login", authController.login);
router.post(
  "/updateMyPassword",
  authController.protect,
  authController.updatePassword
);
router.get("/", userController.getAll);
router.get("/:id", authController.protect, userController.getUser);
router.post("/create", userController.createUser);
router.post("/update/:id", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);

module.exports = router;
