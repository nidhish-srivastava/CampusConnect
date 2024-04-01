import mongoose, { Mongoose } from 'mongoose'

const authSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dp: { type: String,default : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" }
})

const userSchema = new mongoose.Schema({
    username: { type: String, default: "", required: true },
    authId: { type: mongoose.Schema.Types.ObjectId, ref: "Auth" },
    email: { type: String, default: "" },
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    leetcode: { type: String, default: "" },
    college: { type: String, default: "" },
    collegeLocation: { type: String, default: "" },
    collegeCity: { type: String, default: "" },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
})


const collegeSchema = new mongoose.Schema({
    colleges: { type: [String], default: "", required: true }
})

const notificationSchema = new mongoose.Schema({
    receipient : {type : mongoose.Schema.Types.ObjectId},
    sender : {type : mongoose.Schema.Types.ObjectId,ref:"Auth"},
    read : {type:Boolean,default:false},
    type : {type : String,enum : ['like','follow']}
})

const User = mongoose.model("User", userSchema)
const Auth = mongoose.model("Auth", authSchema)
const College = mongoose.model("College", collegeSchema)
const Notification = mongoose.model("Notification",notificationSchema)

export {
    User,
    Auth,
    College,
    Notification
}