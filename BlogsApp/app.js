import express from "express";
import mongoose from "mongoose";
import blogrouter from "./routes/blog-routes";
import router from "./routes/user-routes";
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/user",router);
app.use("/api/blogs",blogrouter);
mongoose.connect (
        "mongodb://localhost:27017/BlogsApp")
        .then(()=>console.log("Connected to Database"))
        .catch((err)=>console.log(err));
//Abhi0532
const PORT =process.env.PORT || 5000;

if(process.env.NODE_ENV = "production"){
        app.use(express.static("frontend/build"));
}

app.listen(PORT,'localhost',() =>{
        console.log(`Server is running on port no ${PORT}`)
});