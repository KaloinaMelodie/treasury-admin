const express = require("express");

const controller = require("./member.controller");

const router = express.Router();

const validate = require("../../middleware/validate");

const { createMemberValidation } = require("./member.validation");

router.get(
  "/",

  controller.getAll,
);

router.get(
  "/:id",

  controller.getOne,
);


router.post(
  "/",

  createMemberValidation,

  validate,

  controller.create,
);

module.exports = router;
