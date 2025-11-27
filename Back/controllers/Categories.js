import categorySchema from "../models/Category.js";

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = await categorySchema.create({ name });
    res.status(200).json({ message: "success", newCategory });
  } catch (error) {
    res.status(500).json({ message: "Fail", error });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const allCategories = await categorySchema.find();
    res.status(200).json({ message: "success", data: allCategories });
  } catch (error) {
    res.status(400).json({ message: "faill", data: error });
  }
};
