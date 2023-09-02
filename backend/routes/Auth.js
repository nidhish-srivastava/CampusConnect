import express from "express"
const router = express.Router()
import { Auth, User } from '../db/index.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
import { authenticateJwt } from '../middleware/auth.js'
import uploadImage from '../UploadImage.js'
import { nanoid } from 'nanoid'
nanoid();




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

const uploadImagePromise = async (dp, imageId) => {
    // console.log("uplpoad image");
    try {
        const imageUrl = await uploadImage(dp, imageId)
        return imageUrl
    }
    catch (error) {
        console.log(error)
    }
}

const newAdminSavePromise = async(newAdmin) =>{
    // console.log("new admin poromise");
    return await newAdmin.save()   
}

const findUserinAuthPromise = async(username) =>{
    return await Auth.findOne({username})
}

const userCreatePromise = async(newAdmin) =>{
    // console.log("user create promise");
    await User.create({
        authId: newAdmin._id,
        username: newAdmin.username,
        followers: [],
        following: []
    })
}



router.post('/uploadImage',async(req,res)=>{
    const {username,dp} = req.body
    // const admin = await findUserinAuthPromise(username)
    // console.log(dp);
    // console.log(admin);
    const imageId = nanoid().split('-')[0]
    const imageUrl = await uploadImagePromise(dp,imageId)
    // console.log(imageUrl);
    await Auth.updateOne({username : username},{dp : imageUrl})
})


router.post('/signup', async (req, res) => {
    const { username, password, dp } = req.body
    const imageId = nanoid().split('-')[0]
    try {
        const imageUrl = await uploadImagePromise(dp, imageId)

        const admin = await findUserinAuthPromise(username)
        if (admin) {
            res.status(403).json({ message: "User already exists" })
        }
        else {
            const newAdmin = new Auth({ username: username, password: bcrypt.hashSync(password), dp: imageUrl })
            // await newAdmin.save()
            await newAdminSavePromise(newAdmin)
            const token = jwt.sign({ username, role: 'admin' }, process.env.SECRET, { expiresIn: '1h' })
            res.json({ message: "User created successfully", token })
            // await User.create({
            //     authId: newAdmin._id,
            //     username: newAdmin.username,
            //     followers: [],
            //     following: []
            // })
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