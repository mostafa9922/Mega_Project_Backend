const express = require("express");
const { getUsers } = require("../controllers/users");
const { register, login } = require("../controllers/auth");
// const { upload } = require("../../utils/multer");

const router = express.Router();

router.route("/").get(getUsers);
// router.route("/register").post(upload.single("img"), register);
router.route("/register").post(register);
router.route("/login").post(login);

module.exports = router;
