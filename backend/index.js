import express from 'express'
const app = express()
app.use(express.json())
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config()
import UserRoute from './routes/User.js'
import AuthRoute from "./routes/Auth.js"
import CollegeRoute from './routes/College.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import { v2 as cloudinary } from 'cloudinary'
import { nanoid } from 'nanoid'
nanoid();
app.use(cookieParser())
app.use(bodyParser.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }))
// app.use(cors({ origin: 'http://localhost:3000' }))
// app.use(cors({ origin: ['https://campus-connect-edu.vercel.app','http://localhost:3000'] }))
app.use(cors())

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

const PORT = process.env.PORT || 4000

const start = async () => {
    mongoose.connect(process.env.MONGO_DB_URI)
    console.log("Connected to DB");
    app.listen(PORT, () => {
        console.log(`Server listening at port ${PORT}`);
    })
}
start()

app.get('/',async(req,res)=>{
    res.send(`Welcome to Backend deployment of Campus Connect`)
})

app.use('/auth', AuthRoute)
app.use('/user', UserRoute)
app.use('/college',CollegeRoute)