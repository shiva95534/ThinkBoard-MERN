import dotenv from "dotenv"
import path from "path";

dotenv.config();

import express from 'express';
import cors from "cors"


import NoteRoutes from "./routes/NoteRoutes.js";
import connectDB from "../config/db.js"
import rateLimiter from '../Middlewares/rateLimiter.js';

const app = express();
app.use(express.json());
const __dirname = path.resolve();

// console.log(process.env.PORT);
const port = process.env.PORT || 3001
if(process.env.NODE_ENV !== "production"){
    app.use(cors({
        origin: "http://localhost:5173",
    }))
}

app.use(rateLimiter);


// middle wares
app.use((req,res,next) => {
    console.log(`Reqest Method: ${req.method}\nReqest URL: ${req.url}`)
    next();
})

app.use("/api/notes", NoteRoutes );

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("*",(req,res) => {
        res.sendFile(path.__dirname,"../frontend","dist","index.html")
    })
}

connectDB().then(()=>{
    app.listen(port, () => {
        console.log(`server running on port ${port}`);  
    });
})
.catch((err) => {
    console.log("Failed to Connect to DB",err);
    process.exit(1);
});




// mongodb+srv://shivaprasad70997:JByInGZNRuKY1cnA@cluster0.ywi1pwf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0