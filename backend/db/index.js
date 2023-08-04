const mongoose = require('mongoose')

// Whenever we 
const userSchema = new mongoose.Schema({
    username : {type : String,unique : true,required : true},
    followers : [{type : mongoose.Schema.Types.ObjectId,ref : "User"}],
    following : [{type : mongoose.Schema.Types.ObjectId,ref : "User"}]
})

const User = mongoose.model("User",userSchema)

module.exports = {
    User
}