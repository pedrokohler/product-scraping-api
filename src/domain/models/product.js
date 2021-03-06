const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  title: String,
  image: String,
  price: Number,
  description: String,
  url: String,
},
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
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
/* eslint-enable no-param-reassign */
/* eslint-enable no-underscore-dangle */
});

productSchema.index({ url: 1 });

const Product = model("Product", productSchema);

module.exports = Product;
