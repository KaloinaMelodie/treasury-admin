const { body } = require("express-validator");

const createMemberValidation = [
  body("first_name")
    .notEmpty()

    .withMessage("First name required"),

  body("last_name")
    .notEmpty()

    .withMessage("Last name required"),

  body("entry_date")
    .notEmpty()

    .withMessage("Entry date required"),

  body("subscription.amount")
    .optional()

    .isNumeric()

    .withMessage("Amount must be numeric"),

  body("subscription.frequency")
    .optional()

    .isIn(["MONTHLY", "YEARLY", "CUSTOM"]),
];

module.exports = {
  createMemberValidation,
};
