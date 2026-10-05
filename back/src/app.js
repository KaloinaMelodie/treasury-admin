const express = require("express");
const cors = require("cors");

const categoryRoutes = require("./modules/categories/category.routes");

const notFound =require("./middleware/notFound");


const errorHandler =require("./middleware/errorHandler");

const app = express();


app.use(cors());

app.use(express.json());

app.get("/",(req,res)=>{

res.json({
message:"Treasury API running"
});

});

app.use(
    "/api/categories",
    categoryRoutes
);

app.use(notFound);


app.use(errorHandler);

module.exports = app;