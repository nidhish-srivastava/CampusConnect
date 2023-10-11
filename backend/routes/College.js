import express from 'express'
const router = express.Router()
import { College, User } from '../db/index.js'

router.get('/', async (req, res) => {
    try {
        const response = await College.find({})
        res.json(response[0])
    } catch (error) {        
    }
})

router.post('/create', async (req, res) => {
    const c = new College({ colleges: "NMIT" })
    await c.save()
})

router.get('/fetchCollegeStudents/:college', async (req, res) => {
    const { college } = req.params
    const response = await User.find({ college: college }).populate({
        path: "authId",
        model: "Auth",
        select: "username dp"
    })
    const result = response.map(e => e.authId)
    res.json(result)
})

// Update the colleges
router.post('/', async (req, res) => {
    const { college } = req.body
    await College.updateOne({ _id: "65165689bc8f1d9498fd5b1f" }, { $addToSet: { colleges: college } })
})

export default router
