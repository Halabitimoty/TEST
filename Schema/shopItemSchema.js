const mongoose = require("mongoose");

const shopItem = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isInStock: {
      type: Boolean,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);
const shopItemCollection = mongoose.model("shopItem", shopItem);

module.exports = {
  shopItemCollection,
};
