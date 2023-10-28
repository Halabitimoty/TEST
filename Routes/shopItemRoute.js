const express = require("express");
const route = express.Router();

const {
  addItems,
  deleteItemById,
  getAllitems,
  getItemsbyId,
  updateItems,
} = require("../Controller/shopController");
const { isUserLoggedIn, adminsOnly } = require("./middleware");

route.get("/", isUserLoggedIn, getAllitems);
route.get("/:id", isUserLoggedIn, getItemsbyId);
route.post("/", isUserLoggedIn, addItems);
route.patch("/:id", isUserLoggedIn, updateItems);
route.delete("/:id", isUserLoggedIn, adminsOnly, deleteItemById);

module.exports = route;
