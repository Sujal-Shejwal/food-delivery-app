import express from "express"
import { addFood, listFood , removeFood} from "../controllers/foodController.js"
import multer from "multer"

const foodRouter = express.Router();

// Image storage engine 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");   // ✅ fix
    },
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const Upload = multer({ storage: storage })

foodRouter.post("/add", Upload.single("image"), addFood)
foodRouter.get("/list", listFood)
foodRouter.post("/remove",removeFood);

export default foodRouter;