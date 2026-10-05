const express = require("express");
const cors = require("cors");


const app = express();


app.use(cors());

app.use(express.json());

const categoryRoutes = require("./modules/categories/category.routes");


app.use(
    "/api/categories",
    categoryRoutes
);


app.get("/",(req,res)=>{

res.json({
message:"Treasury API running"
});

});


module.exports = app;