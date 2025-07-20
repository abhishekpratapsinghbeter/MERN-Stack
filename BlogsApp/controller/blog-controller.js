import mongoose from "mongoose";
import Blog from "../model/Blog";
import User from "../model/User";


export const getAllBlogs =async(req,res,next)=>{
    let blogs;
    try{
        blogs =await Blog.find().populate('user');
    }catch(err){
        console.log(err)
    }
    if(!blogs){
        return res.status(404).json({message:"No Blogs found"})
    }
    return res.status(200).json({blogs})
}

export const addblogs = async(req,res,next)=>{
    const {title,description,image,user}= req.body;
    let existtingUsers;
    try {
        existtingUsers =await User.findById(user);
    } catch (err) {
        return console.log(err);
    }
    if(!existtingUsers){
        return res.status(400).json({message:"Unable to find user"})
    }
    const blog = new Blog({
        title,
        description,
        image,
        user,
    });
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existtingUsers.blogs.push(blog);
        await existtingUsers.save({session})
        await session.commitTransaction();
    } catch (err) {
        return console.log(err);
        return res.status(500).json({message:err})
    }
    return res.status(200).json({blog});
}
export const updateblog = async(req,res,next)=>{
    const{title,description}=req.body;
    const blogId = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogId,{
            title,
            description
        })
    } catch (err) {
        return console.log(err)
    }
    if (!blog) {
        return res.status(500).json({message:"Unable to update the blog"})
    }
    return res.status(200).json({blog});
    
}
export const getbyId= async (req,res,next)=>{
    const Id = req.params.id;
    let blog;
    try {
        blog = await Blog.findById(Id);
    } catch (err) {
        return console.log(err);
    }
    if (!blog) {
        return res.status(404).json({message:"No blog found"});
        
    }
    return res.status(200).json({blog});
};

export const deleteBlog = async (req,res)=>{
    const id=req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndRemove(id).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save()
    } catch (err) {
        return console.log(err);
    }
    if (!blog) {
        return res.status(404).json({message:"Unable to delete"});   
    }
    res.status(200).json({message:"Succesfull"})

};

export const getbyuserId = async(req,res,next) =>{
    const userId = req.params.id;
    let userBlogs;
    try {
        userBlogs = await User.findById(userId).populate("blogs");

    } catch (err) {
        return console.log(err)
    }
    if(!userBlogs){
        return res.status(404).json({message:"No blog Found"})
    }
    return res.status(200).json({user:userBlogs})
}

