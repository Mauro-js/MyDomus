const express = require("express");
const router = express.Router();
const { systemController } = require("../controllers");
const { pagination } = require("../midlewares/pagination");
const { body } = require("express-validator");

const systemValidations = [
  body("name")
    .isString()
    .isLength({ min: 1, max: 255 })
    .withMessage("The name field cannot be longer than 255 characters")
    .matches(/^[a-zA-Z0-9\s]+$/) // Only allow letters, numbers, and spaces (no special characters)
    .withMessage(
      "The name field must only contain letters, numbers, and spaces"
    )
    .trim()
    .escape()
    .notEmpty()
    .withMessage("The name field is required"),
];

router.get("/", pagination, systemController.list);

router.get("/:id", systemController.show);

router.post(
  "/",
  systemValidations,
  systemController.add
);

router.put(
  "/:id",
  systemValidations,
  systemController.update
);

router.delete("/:id", systemController.destroy);

module.exports = router;
