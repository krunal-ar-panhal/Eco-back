import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;
    console.log("request body",req.body.price);

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4];

    let imageurl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      category,
      subCategory,
      price: Number(price),
      bestSeller: bestSeller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imageurl,
      date: Date.now(),
    };

    console.log(productData);

    console.log(
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller
    );
    console.log(imageurl);

        const product = new productModel(productData)
        await product.save();   

    return res.json({
        success : true,
        message : "Product created successfully"
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({})
        return res.json({
            success : true,
            products,
            message : "products listed successfully"
        })
    } catch (error) {
        console.log(error);
        return res.json({
            success : false ,
            message : error.message
        })
    }
};

export const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        return res.json({
            success : true,
            message : "product deleted successfully"
        })
    } catch (error) {
        console.log(error);
        return res.json({
            success : false ,
            message : error.message
        })
    }
};

export const singleProduct = async (req, res) => {
    try {
        const {productId} = req.body
        const product = await productModel.findById(productId)
        return res.json({
            success : true,
            product,
            message : "signle product listed"
        })
    } catch (error) {
        console.log(error);
        return res.json({
            success : false ,
            message : error.message
        })
    }
};
