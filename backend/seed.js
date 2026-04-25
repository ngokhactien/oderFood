import mongoose from "mongoose";
import Product from "./models/Product.js";
import dotenv from "dotenv";
import data from "./data.js";

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Product.deleteMany();
    await Product.insertMany(data);

    console.log("Seed thành công 🎉");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

seed();