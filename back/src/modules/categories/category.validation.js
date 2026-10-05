const {
 body
} = require("express-validator");


const createCategoryValidation = [

    body("name")
        .notEmpty()
        .withMessage(
            "Name is required"
        ),


    body("type")
        .isIn([
            "INCOME",
            "EXPENSE",
            "BOTH"
        ])
        .withMessage(
            "Invalid category type"
        )

];


module.exports = {

    createCategoryValidation

};