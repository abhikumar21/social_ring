import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    desc: String,
    likes: [],
    image: String,

},

{
   timestamps: true


});

var PostModel = mongoose.model("Posts", PostSchema)
export default PostModel;

