const express = require("express");
const router = express.Router();

const services = require("../sevices/render");

router.get("/", services.home);

module.exports = router;
