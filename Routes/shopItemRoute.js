const express = require("express");
const route = express.Router();

const { shopItemCollection } = require("../Schema/shopItemSchema");
const { isUserLoggedIn, adminsOnly } = require("./middleware");

route.get("/", isUserLoggedIn, async (req, res) => {
  const tasks = await shopItemCollection.find();
  res.json(tasks);
});

route.get("/:id", isUserLoggedIn, async (req, res) => {
  const task = await shopItemCollection.findById(req.params.id);
  res.send(task);
});

route.use(isUserLoggedIn);
route.use(adminsOnly);

route.post("/", async (req, res) => {
  const shopItem = await shopItemCollection.create({
    name: req.body.name,
    description: req.body.description,
    isInStock: req.body.isInStock,
  });

  res.json({
    isRequestSuccesful: true,
    shopItem,
  });
});

route.patch("/:id", async (req, res) => {
  const updatedItem = await shopItemCollection.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  );

  res.json({
    message: "Item updated Successfully",
    updatedItem,
  });
});

route.delete("/:id", async (req, res) => {
  const item = await shopItemCollection.findById(req.params.id);
  console.log(item);
  if (item === null) {
    res.status(401).send("Item not present");
    return;
  }
  await shopItemCollection.findByIdAndDelete(req.params.id);
  res.send("Item has been deleted sucessfully!");
});

module.exports = route;
