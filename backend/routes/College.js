import express from 'express'
const router = express.Router()
import { College, User } from '../db/index.js'

router.get('/',async(req,res)=>{
    const response =  await College.find({})
    res.json(response[0])
})

router.post('/create',async(req,res)=>{
    const c = new College({colleges : "NMIT"})
    await c.save()
})

router.get('/fetchCollegeStudents/:college',async(req,res)=>{
    const {college} = req.params
    // const response = await User.find({college : college})
    // console.log(response);
    const response = await User.find({college : college}).populate({
        path : "authId",
        model : "Auth",
        select : "username dp"
    })
    const result = response.map(e=>e.authId)
    res.json(result)
})

// Update the colleges
router.post('/',async(req,res)=>{
    const {documentId,college} = req.body
    // console.log(college);
    // const find = await College.findByIdAndUpdate("64e994388093ece70dfb44cf",)
    // res.json(find)
    // const update = find.colleges.push(college)/
    // console.log(find);
    // console.log(update);
    await College.updateOne({_id : "64f40d03fbbae58f2af2f07a"},{ $addToSet : {colleges : college}})
})

export default router
