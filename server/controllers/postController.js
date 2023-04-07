import mongoose from "mongoose";
import PostModel from "../models/postModel.js";

//1:35

//create new Post
export const createPost = async(req, res) => {
    const newPost = new PostModel(req.body)

    try {
        await newPost.save()
        res.status(200).json(newPost)

    } catch (error) {
        res.status(500).json(error)
        
    }
}

//get a post
export const getPost = async(req, res) => {
    const id = req.params.id

    try {
        const post = await PostModel.findById(id)
        res.status(200).json(post)

    } catch (error) {
        res.status(500).json(error)
    }
}

//update a post
// export default updatePost = async(req, res) => {
//     const id = req.params.id
    
// }