const express = require('express')
const { User, College,Auth } = require('../db/index')
const router = express.Router()
// const mongoose = require('mongoose')
const { authenticateJwt } = require('../middleware/auth')

// Searching a user
router.get('/',async(req,res)=>{
    const {username} = req.query
    const queryObject = {}
    if(username){
        queryObject.username = {$regex : username,$options : "i"}
    }
    const getUsername = await Auth.find(queryObject)
    res.json(getUsername)
})

// Creating a profile
// If we create a new instance,then a new document inside the User model is created
// So we will use the update method
router.put('/user-profile/:userDocumentId', async (req, res) => {
    const {college} = req.body
    const { userDocumentId } = req.params
    const collegeArray = new College()
    collegeArray.colleges.push(college)
    await collegeArray.save()
    await User.updateOne({ _id: userDocumentId }, req.body)
})



//* NOT IN USE RIGHT NOW
router.get('/college/:userDocumentId', async (req, res) => {
    // res.status(200).json({msg : "Updated Successfully",response})
    const { userDocumentId } = req.params
    const collegeUser = await User.findOne({ _id: userDocumentId });

    const newCollege = new College({
        collegeInfo: collegeUser._id
    });

    await newCollege.save();

    // Now you can populate the collegeInfo field
    // const populatedCollege = await College.findOne({}).populate('collegeInfo','college') //* Now we are populating multiple fields
    const populatedCollege = await College.findOne({})
        .populate({
            path: 'collegeInfo',
            model: 'User',
            select: 'college collegeCity collegeLocation'
        })
        .exec();
        res.json(populatedCollege)
})


// router.get('/fetch-profile/:userDocumentId',async(req,res)=>{
//     const {userDocumentId} = req.params
//     const fetchProfileData = await User.findById(userDocumentId)
//     res.json(fetchProfileData)
// })

// Fetch all users by populating the authId object with the username from Auth model
//* NOT IN USE RIGHT NOW
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
        const response = await User.findOne({ authId: id }).populate('authId','username')
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



