require('dotenv').config();
const express = require("express");
var cors = require('cors');
const { dbConnection } = require("./database/config");

//create server express
const app = express();

//configure cors
app.use(cors());

//Reead parser body
app.use(express.json());

//Database
dbConnection();

//Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/login', require('./routes/auth'));

// app.get("/", (req, res) => {
//   res.json({
//     ok: true,
//     msg: "Hello World",
//   });
// });

app.listen(4000, () => {
  console.log("Server running at port 4000");
});
