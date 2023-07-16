const express = require("express");
const {
  registerUser,
  loginUser,
  currentUser,
  updateUser,
} = require("../controllers/userController");
const tokenValidation = require("../middlewares/tokenValidation");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/currentuser", tokenValidation, currentUser);
router.put("/update/:id", tokenValidation, updateUser);

module.exports = router;
