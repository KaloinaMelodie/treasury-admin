const express = require("express");

const controller = require("./category.controller");

const router = express.Router();

const validate = require("../../middleware/validate");

const { createCategoryValidation } = require("./category.validation");

router.get("/", controller.getAll);

router.get("/:id", controller.getOne);

router.post("/", createCategoryValidation, validate, controller.create);

router.put("/:id", controller.update);

router.patch("/:id/status", controller.updateStatus);

router.delete("/:id", controller.remove);

module.exports = router;
