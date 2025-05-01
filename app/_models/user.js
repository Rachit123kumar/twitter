import mongoose from "mongoose";

const UserSchema =new mongoose.Schema({
    displayName: {
        type: String,
        required: true,
    },

    bio: {
        type: String
    },
    profilePic: {
        type: String,
        default: ""
    },
    coverImage: {
        type: String,
        default: ""
    },
    userName: {
        type: String,
      
        sparse:true,
        unique:true,
    },
    email: {
        type: String,
        required: true,
        unique: true,

    },
    verified:{
type:Boolean
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})
const User = mongoose.models.User || mongoose.model("User", UserSchema)


export default User;
