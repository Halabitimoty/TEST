const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 4001;

const userRoute = require("./Routes/userRoutes");
const shopRoute = require("./Routes/shopItemRoute");

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    console.log("Connected to MongoDB Successfully");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use(express.json());
app.use("/home", userRoute);
app.use("/item", shopRoute);

app.get("/", (req, res) => {
  res.send("Welcome to CRUD!!!");
});

app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
