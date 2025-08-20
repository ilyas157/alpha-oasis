import mongoose from "mongoose";

const MessageScheme = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    sujet: String,
    message: String,
    status : {type: String, enum:['lu', 'non lu']}
});

const Message = mongoose.model('Message', MessageScheme);

export default Message;