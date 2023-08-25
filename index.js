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
app.use('/api/hospitals', require('./routes/hospitals'));
app.use('/api/doctors', require('./routes/doctors'));
app.use('/api/todo', require('./routes/todo'));
app.use('/api/upload', require('./routes/uploads'));

// app.get("/", (req, res) => {
//   res.json({
//     ok: true,
//     msg: "Hello World",
//   });
// });

app.listen(4000, () => {
  console.log("Server running at port 4000");
});
