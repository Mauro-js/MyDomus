const express = require("express");
const monthlyExpenses = require("./monthlyExpenses");

const router = express.Router();

router.use("/status", (_req, res, _next) => {
  return res.json({ status: "OK" });
});
router.use("/monthlyExpenses", monthlyExpenses);

module.exports = router;
