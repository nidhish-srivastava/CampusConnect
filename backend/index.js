const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const UserRoute = require('./routes/User')
const AuthRoute = require("./routes/Auth")
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors({origin : 'http://localhost:3000'}))

const PORT = process.env.PORT || 4000

const start = async()=>{
    mongoose.connect(process.env.MONGO_DB_URI)
    console.log("Connected to DB");
    app.listen(PORT,()=>{
        console.log(`Server listening at port ${PORT}`);
    })
}
start()

app.use('/user',UserRoute)
app.use('/auth',AuthRoute)