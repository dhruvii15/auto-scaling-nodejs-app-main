const express = require("express");
const multer = require("multer");
const { createUser, getUsers } = require("../controllers/userController");

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/add", upload.single("photo"), createUser);
router.get("/", getUsers);

module.exports = router;
