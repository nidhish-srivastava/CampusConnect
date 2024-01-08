import express from "express"
const router = express.Router()
import { Auth, User } from '../db/index.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
import { authenticateJwt } from '../middleware/auth.js'
import { uploadImage} from '../utils/index.js'
import {v2 as cloudinary} from 'cloudinary'
import { nanoid } from 'nanoid'
nanoid();
import { defaultImage } from "../utils/index.js"


router.get('/me', authenticateJwt, async (req, res) => {
    const admin = await Auth.findOne({ username: req.user.username })
    if (!admin) {
        res.status(403).json({ msg: "User doesnt exist" })
        return
    }
    res.json({
        username: admin.username,
        id: admin._id,
        dp : admin.dp
    })
})


const userCreatePromise = async(newAdmin) =>{
    // console.log("user create promise");
    await User.create({
        authId: newAdmin._id,
        username: newAdmin.username,
        followers: [],
        following: []
    })
}

router.put('/removeDp',async(req,res)=>{
    const {user,public_id} = req.body
    try {
        const removeRes = await cloudinary.uploader.destroy(public_id)
            const response = await Auth.findOneAndUpdate({ username:user }, {
                 dp: defaultImage ,
              },{new : true});
              res.status(200).json(response.dp);
    } catch (error) {
        
    }
})


router.post('/uploadImage',async(req,res)=>{
    const {username,dp} = req.body
    const imageId = nanoid().split('-')[0]
    try {
        const imageUrl = await uploadImage(dp,imageId)
        const response = await Auth.updateOne({username : username},{dp : imageUrl})
        if(response.modifiedCount>0){
            res.sendStatus(201)
        }
    } catch (error) {
        
    }
})


router.post('/signup', async (req, res) => {
    const { username, password } = req.body
    try {
        const admin = await Auth.findOne({username})
        if (admin) {
            res.status(403).json({ message: "User already exists" })
        }
        else {
            const newAdmin = new Auth({ username: username, password: bcrypt.hashSync(password) })
            await newAdmin.save()
            const token = jwt.sign({ username, role: 'admin' }, process.env.SECRET, { expiresIn: '1h' })
            res.json({ message: "User created successfully", token })
            await userCreatePromise(newAdmin)
        }
    }
    catch (error) {

    }
}
)

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    const admin = await Auth.findOne({ username })
    if (admin) {
        bcrypt.compare(password, admin?.password, function (err, info) {
            if (err) return res.status(401).json("password doesnt match")
            if (info) {
                const token = jwt.sign({ username, role: 'admin' }, process.env.SECRET, { expiresIn: '1h' })
                res.json({ message: 'Logged in successfully', token, admin });
            }
        })
    }
    else {
        res.status(403).json({ message: 'Invalid username or password' });
    }
})


export default router