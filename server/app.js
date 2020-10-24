const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

//db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Db Connected"));

const customMiddleWare = (req, res, next) => {
  console.log("middleware executed");
  next();
};

app.use(express.json());
app.use(require("./routes/auth"));

app.get("/about", customMiddleWare, (req, res) => {
  console.log("About");
  res.send("About");
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
