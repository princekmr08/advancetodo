import { User } from "../model/user.model.js";

import bcrypt from "bcrypt";





const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accesstoken = user.generateAccessToken()
        const refreshtoken = user.generateRefreshToken()
     
      
        user.refreshToken = refreshtoken
        await user.save({ validateBeforeSave: false })
        return {accesstoken, refreshtoken}


    } catch (error) {
        //return {error: "Error generating tokens"}
        console.log(error);
    throw error;
    }
}

const registeruser=async(req,res)=>{
      const {email,fullname,password}=req.body;
      
     try {
       if(!email || !fullname || !password){
            return res.status(400).json({message:"All fields are required"});
      }

      const existedUser = await User.findOne({email:email});
      if(existedUser){
            return res.status(400).json({message:"user already exists"});
      }

        const user = await User.create({
        fullname,
        email, 
        password,
        
    })

    return res.status(200).json({
        success: true,
        message: "Registration successful",
      });
     } catch (error) {
      console.log(error);
      return res.status(500).json({message:"Server error"});
      
     }

    


      
}

const loginuser=async(req,res)=>{
      const { email, password } = req.body;
  
    try {
      const checkUser = await User.findOne({ email });
      if (!checkUser)
        return res.json({
          success: false,
          message: "User doesn't exists! Please register first",
        });
  
      const checkPasswordMatch = await bcrypt.compare(
        password,
        checkUser.password
      );
      if (!checkPasswordMatch)
        return res.json({
          success: false,
          message: "Incorrect password! Please try again",
        });
  
      const {accesstoken, refreshtoken} = await generateAccessAndRefereshTokens(checkUser._id)
    

       const loggedInUser = await User.findById(checkUser._id).select("-password -refreshToken")
  
      res.cookie("accesstoken", accesstoken, { httpOnly: true, secure: false })
      .cookie("refreshtoken", refreshtoken, { httpOnly: true, secure: false })
      .json({
        success: true,
        message: "Logged in successfully 1",
        accesstoken: accesstoken,
        user: loggedInUser,
        
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Some error occured",
      });
    }
}

const logoutuser=async(req,res)=>{

      await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: false
    }

    return res
    .status(200)
    .clearCookie("accesstoken", options)
    .clearCookie("refreshtoken", options)
    .json({
            success: true,
            message: "Logged out successfully"
    })
      

}

const getuserdetails=async(req,res)=>{
  try{
  
    const user = await User.findById(req.user._id).select("-password -refreshToken");
    return res.status(200).json({
            success: true,
            user:user,
            message: "details fetyched succesffully"
    })

  }catch(error){
    console.log(error);
      res.status(500).json({
        success: false,
        message: "Some error occured",
      });

}
}

export {registeruser,loginuser,logoutuser,getuserdetails}