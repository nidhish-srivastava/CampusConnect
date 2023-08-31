import express from "express"
const router = express.Router()
import { Auth, User } from '../db/index.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
import {authenticateJwt} from '../middleware/auth.js'



router.get('/me',authenticateJwt,async(req,res)=>{
    const admin = await Auth.findOne({username : req.user.username})
    if (!admin) {
        res.status(403).json({ msg: "User doesnt exist" })
        return
    }
    res.json({
        username: admin.username,
        id : admin._id
    })
})

router.post('/signup', async (req, res) => {
    const { username, password } = req.body
    const admin = await Auth.findOne({ username })
    if (admin) {
        res.status(403).json({ message: "User already exists" })
    }
    else {
        const newAdmin = new Auth({ username: username, password: bcrypt.hashSync(password) })
        await newAdmin.save()
        // now we will digitally sign the jwt    
        const token = jwt.sign({ username, role: 'admin' }, process.env.SECRET, { expiresIn: '1h' })
        // // This cookie will be inside the response header
        // res.cookie('token', token, {
        //     // inside this we will follow some industrial practices
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: 'strict',
        //     maxAge: 3600000,
        // })
        res.json({ message: "User created successfully",token })
        await User.create({
            authId : newAdmin._id,
            username : newAdmin.username,
            followers : [],
            following : []
        })
        // res.json({message : "User created successfully",token})
    }
}
)

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    const admin = await Auth.findOne({ username})
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