const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController.js");

router.get("/find/:userID,", usersController.getUser);

module.exports = router;