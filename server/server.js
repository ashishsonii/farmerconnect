

import express from "express"
import cors from "cors"

import dotenv from "dotenv"
dotenv.config();
const app = express();
import mongoose from "mongoose";
import authRouter from "./routes/Auth.js"
import protecti from "./routes/protected.js"



app.use(cors());
app.use(express.json()); 
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection error:", err));


 
app.use("/api/auth", authRouter);
app.use("/",protecti);














app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

