import mongoose from "mongoose";

const MessageSchema = mongoose.Schema(
    {
        chatId: String,
        senderId: String,
        text: String,
    },
    {timestamps: true}

);

const MessageModel = mongoose.model("Message", MessageSchema)
export default MessageModel;