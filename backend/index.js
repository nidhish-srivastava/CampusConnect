const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const UserRoute = require('./routes/User')
dotenv.config()
const app = express()
app.use(express.json())

const PORT = process.env.PORT || 4000

const start = async()=>{
    mongoose.connect(process.env.MONGO_DB_URI)
    console.log("Connected to DB");
    app.listen(PORT,()=>{
        console.log(`Server listening at port ${PORT}`);
    })
}
start()

app.use('/',UserRoute)