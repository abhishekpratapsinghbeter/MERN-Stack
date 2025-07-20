import express from 'express';
import {  addblogs, deleteBlog, getAllBlogs, getbyId, getbyuserId, updateblog } from '../controller/blog-controller';

const blogrouter = express.Router();

blogrouter.get("/",getAllBlogs);
blogrouter.post("/add",addblogs);
blogrouter.put("/update/:id",updateblog);
blogrouter.get("/:id",getbyId);
blogrouter.delete("/:id",deleteBlog);
blogrouter.get("/user/:id",getbyuserId);
export default blogrouter;
