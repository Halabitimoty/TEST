const { shopItemCollection } = require("../Schema/shopItemSchema");

const getAllitems = async (req, res) => {
  const tasks = await shopItemCollection.find();
  res.json(tasks);
};

const getItemsbyId = async (req, res) => {
  const task = await shopItemCollection.findById(req.params.id);
  res.send(task);
};

const addItems = async (req, res) => {
  const shopItem = await shopItemCollection.create({
    name: req.body.name,
    description: req.body.description,
    isInStock: req.body.isInStock,
    price: req.body.price,
  });

  res.json({
    isRequestSuccesful: true,
    message: "Item  Added Successfully",
    shopItem,
  });
};

const updateItems = async (req, res) => {
  const { name, description, price, isInStock } = req.body;
  const updatedItem = await shopItemCollection.findByIdAndUpdate(
    req.params.id,
    {
      name: name,
      description: description,
      price: price,
      price: isInStock,
    },
    { new: true }
  );

  res.json({
    message: "Item updated Successfully",
    updatedItem,
  });
};

const deleteItemById = async (req, res) => {
  const item = await shopItemCollection.findById(req.params.id);
  console.log(item);
  if (item === null) {
    res.status(401).send("Item not present");
    return;
  }
  await shopItemCollection.findByIdAndDelete(req.params.id);
  res.send("Item has been deleted sucessfully!");
};

module.exports = {
  addItems,
  deleteItemById,
  getAllitems,
  getItemsbyId,
  updateItems,
};
