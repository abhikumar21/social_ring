import mongoose from "mongoose";
import PostModel from "../models/postModel.js";
import UserModel from '../models/userModel.js'


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
export const updatePost = async(req, res) => {
    const postId = req.params.id
    const {userId} = req.body

    try {
        const post = await PostModel.findById(postId)
    if(post.userId === userId) {
        await post.updateOne({ $set : req.body })
    }
    else{
        res.status(403).json("Action forbidden")
    }

    } catch (error) {
        res.status(500).json(error)
    }
}

//delete post
export const deletePost = async(req, res) => {
    const postId = req.params.id;
    const {userId} = req.body;

    try {
        const post = await PostModel.findById(postId)
        // if(post.userId === userId) {
          await post.deleteOne();
          res.status(200).json("post deleted successfully")
        // }
        // else{
        //     res.status(403).json("Action forbiddin")
        // }
    } catch (error) {
        res.status(500).json(error)
    }
}


//like and dislike a post
export const likePost = async(req, res) => {
    const postId = req.params.id;
    const {userId} = req.body;

    try {
        const post = await PostModel.findById(postId)
        if(!post.likes.includes(userId)){
            await post.updateOne({$push : {likes: userId}})
            res.status(200).json("You liked this post")
        }
        else{
            await post.updateOne({$pull : {likes: userId}} )
            res.status(200).json("like removed")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}


//getTimelinePosts
export const getIimelinePosts = async(req, res) => {
    const userId = req.params.id

    try {
        const currentUserPosts = await PostModel.find({userId : userId})
        const followingPosts = await UserModel.aggregate([
            {
                $match: {
                    _id : new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $lookup: {
                  from: "posts",
                  localField: "following",
                  foreignField: "userId",
                  as: "followingPosts"
                }
            },
            {
            $project: {
                followingPosts: 1,
                _id: 0
            }
           }
        ])

        res.status(200).json(currentUserPosts.concat(...followingPosts[0].followingPosts).sort((a,b)=> {
            return b.createdAt - a.createdAt;
        })
        )
        
    } catch (error) {
        res.status(500).json(error)
    }

}

