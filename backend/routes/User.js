const express = require('express')
const { User } = require('../db/index')
const router = express.Router()

// Follow a user
router.put('/follow', async (req, res) => {
    const { userId, followUserId } = req.body

    // Add followUserId to the following list of userId
    await User.findByIdAndUpdate(userId, { $addToSet: { following: followUserId } })

    // Add userId to the followers list of followUserId
    await User.findByIdAndUpdate(followUserId, { $addToSet: { followers: userId } })

    res.json("User followed Successfully")
})

// Unfollow a user
router.put('/unfollow', async (req, res) => {
    const { userId, unfollowUserId } = req.body
    // Remove unfollowUserId from the following list of userId
    await User.findByIdAndUpdate(userId, { $pull: { following: unfollowUserId } });

    // Remove userId from the followers list of unfollowUserId
    await User.findByIdAndUpdate(unfollowUserId, { $pull: { followers: userId } });

    res.status(200).json({ message: 'User unfollowed successfully' });

})

// GET FOLLOWERS
router.get('/followers/:userId', async (req, res) => {
    const { userId } = req.params
    const response = await User.findById(userId).populate('followers', 'username')
    res.json({ followers: response.followers })
})

// GET FOLLOWING
router.get('/following/:userId', async (req, res) => {
    const { userId } = req.params
    const response = await User.findById(userId).populate('following', 'username')
    res.json({ following: response.following })
})

module.exports = router



