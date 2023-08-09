const express = require('express')
const { User } = require('../db/index')
const router = express.Router()
// const mongoose = require('mongoose')
const { authenticateJwt } = require('../middleware/auth')

// Creating a profile
// If we create a new instance,then a new document inside the User model is created
// So we will use the update method
router.put('/user-profile/:userDocumentId',async(req,res)=>{
    const {userDocumentId} = req.params
    // const createProfile = new User(req.body)
    // await createProfile.save()
    await User.updateOne({_id : userDocumentId} , req.body)
    // res.status(200).json({msg : "Updated Successfully",response})
})

// router.get('/fetch-profile/:userDocumentId',async(req,res)=>{
//     const {userDocumentId} = req.params
//     const fetchProfileData = await User.findById(userDocumentId)
//     res.json(fetchProfileData)
// })

// Fetch all users by populating the authId object with the username from Auth model
router.get('/fetchAll/:userDocumentId', authenticateJwt, async (req, res) => {
    const { userDocumentId } = req.params
    const response = await User.find().populate('authId', 'username')
    const removeUser = response.filter(e => e._id != userDocumentId)
    res.json(removeUser)
})

// Getting a specific user
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const response = await User.findOne({ authId: id })
        res.json(response);
    } catch (error) {
        res.status(403).json(error)
    }
})

// Follow a user     
router.put('/follow', async (req, res) => {
    const { userDocumentId, followUserId } = req.body
    // Add followUserId to the following list of userId
    await User.findByIdAndUpdate(userDocumentId, { $addToSet: { following: followUserId } })

    // Add userDocumentId to the followers list of followUserId
    await User.findByIdAndUpdate(followUserId, { $addToSet: { followers: userDocumentId } })

    res.json("User followed Successfully")
})

// Unfollow a user
router.put('/unfollow', async (req, res) => {
    const { userDocumentId, unfollowUserId } = req.body
    // Remove unfollowUserId from the following list of userDocumentId
    await User.findByIdAndUpdate(userDocumentId, { $pull: { following: unfollowUserId } });

    // Remove userDocumentId from the followers list of unfollowUserId
    await User.findByIdAndUpdate(unfollowUserId, { $pull: { followers: userDocumentId } });

    res.status(200).json({ message: 'User unfollowed successfully' });

})

// GET FOLLOWERS with their usernames
router.get('/followers/:userId', async (req, res) => {
    const { userId } = req.params
    const response = await User.findById(userId)

    const followersIds = response.followers.map(e => e._id)

    const followers = await User.find({ _id: { $in: followersIds } }, 'authId').populate('authId', 'username');

    res.json(followers)

})

// GET FOLLOWING with their usernames
router.get('/following/:userId', async (req, res) => {
    const { userId } = req.params
    const response = await User.findById(userId)

    const followingIds = response.following.map(e => e._id)

    const following = await User.find({ _id: { $in: followingIds } }, 'authId').populate('authId', 'username');

    res.json(following)
})

module.exports = router



