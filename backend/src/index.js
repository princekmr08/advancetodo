//import 'dotenv/config'
import dotenv from "dotenv";

dotenv.config();
import express from 'express'
import connectDB from './db/connection.js'
import cookieParser from 'cookie-parser'

import userRoutes from "./routes/user.routes.js"
import todoRoutes from "./routes/todo.routes.js"


connectDB();
const app = express()


app.use(express.json())
app.use(cookieParser());

//routes
app.use("/api/user",userRoutes);
app.use("/api/todo",todoRoutes);


app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`)
})

