const mongoose = require('mongoose')

const authSchema = new mongoose.Schema({
    username : {type : String,required : true,unique : true},
    password : {type : String,required : true}
})

const userSchema = new mongoose.Schema({
    authId : {type : mongoose.Schema.Types.ObjectId,ref : "Auth",required : true},
    email : {type : String,default : ""},
    github : {type : String,default : ""},
    linkedin : {type : String,default :""},
    leetcode : {type : String,default : ""},
    college : {type  : String,default : ""},
    collegeLocation : {type : String,default : ""},
    followers : [{type : mongoose.Schema.Types.ObjectId,ref : "User"}],
    following : [{type : mongoose.Schema.Types.ObjectId,ref : "User"}]
})

const User = mongoose.model("User",userSchema)
const Auth = mongoose.model("Auth",authSchema)

module.exports = {
    User,
    Auth
}
// username : {type : String,unique : true,required : true},