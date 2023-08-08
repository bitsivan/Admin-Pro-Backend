require('dotenv').config();
const express = require("express");
var cors = require('cors');
const { dbConnection } = require("./database/config");

//create server express
const app = express();

//configure cors
app.use(cors());

//Database
dbConnection();

//Routes
app.get("/", (req, res) => {
  res.json({
    ok: true,
    msg: "Hello World",
  });
});

app.listen(4000, () => {
  console.log("Server running at port 4000");
});
