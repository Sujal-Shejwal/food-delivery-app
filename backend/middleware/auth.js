import jwt from "jsonwebtoken";

const authMiddleware = async (req,res,next) => {
    const token = req.headers.token;

    if (!token) {
        return res.json({success:false,message:"Not Authorized Login Again"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // ✅ FIX: ensure body exists
        if (!req.body) {
            req.body = {};
        }

        req.body.userId = decoded.id || decoded._id;

        next();
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

export default authMiddleware;