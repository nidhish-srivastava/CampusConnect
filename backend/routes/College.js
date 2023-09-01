import express from 'express'
const router = express.Router()
import { College } from '../db/index.js'

router.get('/',async(req,res)=>{
    const response =  await College.find({})
    res.json(response[0])
})

// router.post('/create',async(req,res)=>{
//     const {college} = req.body
//     const c = new College({colleges : "NMIT"})
//     await c.save()
//     // await College.create(college)
// })


// Update the colleges
router.post('/',async(req,res)=>{
    const {documentId,college} = req.body
    // console.log(college);
    // const find = await College.findByIdAndUpdate("64e994388093ece70dfb44cf",)
    // res.json(find)
    // const update = find.colleges.push(college)/
    // console.log(find);
    // console.log(update);
    await College.updateOne({_id : "64f1dbc96de85ef5995de771"},{ $push : {colleges : college}})
})

export default router
