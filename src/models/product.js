/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  _id: String,
  title: String,
  image: String,
  price: Number,
  description: String,
  url: String,
},
{
  toObject: {
    transform(doc, ret) {
      delete ret._id;
      delete ret.__v;
    },
  },
  toJSON: {
    transform(doc, ret) {
      delete ret._id;
      delete ret.__v;
    },
  },
});

const Product = model("Product", productSchema);

module.exports = Product;
