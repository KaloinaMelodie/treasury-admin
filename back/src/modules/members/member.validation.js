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
  .if((value, { req }) => req.body.subscription != null)
  .isFloat({ gt: 0 })
  .withMessage("Le montant doit être positif"),

  body("subscription.frequency")
  .if((value, { req }) => req.body.subscription != null)
  .isIn(["MONTHLY", "YEARLY", "CUSTOM"])
  .withMessage("Fréquence invalide"),

  body("subscription.start_date")
  .if((value, { req }) => req.body.subscription != null)
  .isISO8601({ strict: true })
  .withMessage("Date de début invalide"),
];

module.exports = {
  createMemberValidation,
};
