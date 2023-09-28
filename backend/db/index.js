import mongoose from 'mongoose'

const authSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dp : {type : String}
})

const userSchema = new mongoose.Schema({
    username : {type : String,default : "",required : true},
    authId: { type: mongoose.Schema.Types.ObjectId, ref: "Auth", required: true },
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

// const collegeSchema = new mongoose.Schema({
//     collegeInfo : {type : ,ref : "User"},
//     collegeLocation : {type : String,ref : "User"},
//     collegeCity : {type  : String,ref : "User"},
//     studentsQuantity : {type : Number,default : 0}
// })

const collegeSchema = new mongoose.Schema({
    colleges : {type : [String],default : ""}
})

const User = mongoose.model("User", userSchema)
const Auth = mongoose.model("Auth", authSchema)
const College = mongoose.model("College", collegeSchema)

export {
    User,
    Auth,
    College
}