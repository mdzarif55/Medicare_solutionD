import { v2 as cloudinary } from "cloudinary"
import Product from "../models/product.js"
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

// Get the current directory of the module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//add product : /api/product/add
export const addProduct = async (req, res) => {
    try {
        if (!req.body.productdata) {
            return res.json({ success: false, message: "Product data is missing" });
        }
        let productData = JSON.parse(req.body.productdata)

        const images = req.files

        if (!images || images.length === 0) {
            return res.json({ success: false, message: "No images uploaded" });
        }

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url
            })
        )

        await Product.create({ ...productData, image: imagesUrl })

        res.json({ success: true, message: "Product Added" })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

//get product : /api/product/list
export const productList = async (req, res) => {
    try {
        const products = await Product.find({})
        res.json({ success: true, products })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}


//get single product : /api/product/id
export const productById = async (req, res) => {
    try {
        const { id } = req.body
        const product = await Product.findById(id)
        res.json({ success: true, product })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

//change product inStock: /api/product/stock
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;
    console.log("changeStock hit:", { id, inStock });

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("❌ Invalid ID:", id);
      return res.status(400).json({ success: false, message: "Invalid Product ID" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: { inStock } },   // ✅ force set
      { new: true }
    );

    if (!updatedProduct) {
      console.log("❌ Product not found:", id);
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    console.log("✅ Updated:", updatedProduct);
    res.json({ success: true, message: "Stock updated successfully", product: updatedProduct });
  } catch (error) {
    console.error("Error updating stock:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
