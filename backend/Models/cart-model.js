const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  productId: { type: String },
  productCount: { type: Number },
});

const cartSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  productList: { type: itemSchema },
});

module.exports = mongoose.model("cart", cartSchema);
