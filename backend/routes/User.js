const express = require('express')
const { User } = require('../db/index')
const router = express.Router()



// GET FOLLOWERS
router.get('/followers/:userId', async (req, res) => {
    const { userId } = req.params
    const response = await User.findById(userId).populate('followers','username')
    res.json({followers : response.followers})
})

// GET FOLLOWING
router.get('/following/:userId', async (req, res) => {
    const { userId } = req.params
    const response = await User.findById(userId).populate('following', 'username')
    res.json({following : response.following})
})

module.exports = router



