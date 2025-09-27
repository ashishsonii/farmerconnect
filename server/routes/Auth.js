import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js"; // import the User schema
const router = express.Router();
import jwt from "jsonwebtoken";


router.post("/signup",async(req,res)=>{
   try {

      const {fullName,password,email}=req.body;

      const existUser=await User.findOne({email});
      if(existUser) return res.status(400).json({message: "user already exist",success:false});
      const salt=await bcrypt.genSalt(10);
      const hashedPassword=await bcrypt.hash(password,salt);

      const newUser=new User({fullName,email,password:hashedPassword});
      await newUser.save();
      res.status(201).json({message:"User registered successfully",success:true})
      
   } catch (error) {
      res.status(500).json({error:error.message});
      
   }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found", success: false });

    // 2️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials", success: false });

    // 3️⃣ Generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 4️⃣ Send success response
    res.status(200).json({
      message: "Login successful",
      success: true,
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



export default router;

