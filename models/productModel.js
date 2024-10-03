import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  sizes: {
    type: String,
    required: true,
  },
  bestSeller: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const productModel =
  mongoose.model.product || mongoose.model("product", productSchema);

export default productSchema;
