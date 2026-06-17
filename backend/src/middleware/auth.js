import { User } from "../model/user.model.js"
import jwt from "jsonwebtoken"


export const verifyjwt=async(req,res,next)=>{
     try {
        const token = req.cookies?.accesstoken || req.header("Authorization")?.replace("Bearer ", "")
        
        // console.log(token);
        if (!token) {
           return res.status(401).json({
                success: false,
                message: "Access token is missing"
            })
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            })
            
        }
    
        req.user = user;
        next()
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "error in verifying access token"
        })
    }
}