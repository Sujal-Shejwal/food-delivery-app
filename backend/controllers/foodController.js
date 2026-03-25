import foodModel from "../models/foodModel.js";
import fs from 'fs'

// add food item
const addFood = async (req, res)=>{

  // ✅ SAFE FIX (no logic change)
  const image_filename = req.file ? req.file.filename : "";

  console.log("BODY:", req.body);   // debug
  console.log("FILE:", req.file);   // debug

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: Number(req.body.price || 0), 
    category: req.body.category,   // 👈 this will now work
    image: image_filename
  })

  try {
    await food.save();
    res.json({success:true,message:"Food Added"})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
  } 
}

// all food list 
const listFood = async (req,res) =>{
    try {
      const foods = await foodModel.find({});
      res.json({success:true,data:foods})
    } catch (error) {
      console.log(error);
      res.json({success:false,message:error.message})
    }
}

// remove food item 
const removeFood = async (req,res)=>{
    try {
      const food = await foodModel.findById(req.body.id);

      fs.unlink(`uploads/${food.image}`, (err) => {
        if (err) console.log(err);
      });

      await foodModel.findByIdAndDelete(req.body.id);

      res.json({success:true,message:"Food Removed"})

    } catch (error) {
      console.log(error);
      res.json({success:false,message:error.message})
    }
}

export { addFood, listFood , removeFood }