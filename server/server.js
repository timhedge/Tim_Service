const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const port = 8082;
const db = require("../database/db.js");

// Middleware
app.use(express.static(path.join(__dirname, "../client/public")));
app.use(express.json());
app.use(cors());

// Routes
app.get("/items", (req, res) => {
  db.getAllItems((err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});


app.listen(port, () => console.log(`Server is running on ${port}...`));
