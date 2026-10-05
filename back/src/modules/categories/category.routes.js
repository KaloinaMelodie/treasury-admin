const express = require("express");

const controller =
require("./category.controller");


const router = express.Router();



router.get(
    "/",
    controller.getAll
);


router.get(
    "/:id",
    controller.getOne
);


router.post(
    "/",
    controller.create
);


router.put(
    "/:id",
    controller.update
);


router.patch(
    "/:id/status",
    controller.updateStatus
);



module.exports = router;