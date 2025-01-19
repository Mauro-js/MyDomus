var express = require("express");
var router = express.Router();
const adminRoutes = require("./admin");

router.use("/admin", adminRoutes);

module.exports = router;
