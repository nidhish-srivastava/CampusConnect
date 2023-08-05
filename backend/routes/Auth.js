const express = require("express")
const router = express.Router()
const { Auth } = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()


router.post('/signup', async (req, res) => {
    const { username, password } = req.body
    const admin = await Auth.findOne({ username })
    if (admin) {
        res.status(403).json({ message: "User already exists" })
    }
    else {
        const newAdmin = new Auth({ username: username, password: bcrypt.hash(password) })
        await newAdmin.save()
        // now we will digitally sign the jwt    
        const token = jwt.sign({ username, role: 'admin' }, process.env.SECRET, { expiresIn: '1h' })
        // This cookie will be inside the response header
        res.cookie('token', token, {
            // inside this we will follow some industrial practices
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 3600000,
        })
        res.json({ message: "User created successfully" })
        // res.json({message : "User created successfully",token})
    }
}
)

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    const admin = await Auth.findOne({ username, password });
    bcrypt.compare(password, admin?.password, function (err, info) {
        if (err) return res.status(401).json("password doesnt match")
        if (info) {
            const token = jwt.sign({ username, role: 'admin' }, process.env.SECRET, { expiresIn: '1h' })
            res.cookie('token', token, {
                // inside this we will follow some industrial practices
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 3600000,
            })
            res.json({ message: 'Logged in successfully', admin });
            // res.json({ message: 'Logged in successfully', token, admin });
        }
    })
})


module.exports = router