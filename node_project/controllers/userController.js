const User = require('../models/User');
const crypto = require('crypto')

// For '/user' endpoint 

const getUsers = async (res, req, next) => {
    const filter = {}
    const options = {}
    if (Object.keys(req.query).length) {
        const {
            gender, 
            userName,
            limit,
            sortByUserName
        } = req.query

        if (gender) filter.gender = true
        if (userName) filter.userName = true

        if(limit) options.limit = limit
        if(sortByUserName) options.sort = {
            userName : sortByUserName
        }

    }

    try {
        const users = await User.find()

        res
        .status(200) // 'ok'
        .setHeader('Content-Type', 'application/json')
        .json(users)
    } catch (err) {
        next(err)
    }

}

const createUser = async (req, res, next) => {
    try {
        const user = await User.create(req.body)

        sendTokenResponse(user, 201, res)
    } catch (err) {
        next(err)
    }
    
}

const deleteUsers = async (req, res, next) => {
    try {
        const users = await User.deleteMany()
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(users)
    } catch (err) {
        next(err)
    }
}

// For '/user/:userId/'
const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId)

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(user)
    } catch (err) {
        next(err)
    }

}

const putUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true })

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(user)
    } catch (err) {
        next(err)
    }   
}

const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId)

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(user)
    } catch (err) {
        next(err)
    }
}

//For '/login' endpoint
const login = async (req, res, next) => {
    const { email, password } = req.body

    if(!email || !password) throw new Error('Please provide an email snd password')

    const user = await User.findOne({ email }).select('+password')

    if (!user) throw new Error('User does not exist')

    const isMatch = await user.matchPassword(password)

    if(!isMatch) throw new Error('Invalid credentials')

    sendTokenResponse(user, 200, res)
}

// For '/forgotPassword' endpoint
const forgotPassword = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })

    if(!user) throw new Error('User does not exist')

    const restToken = user.getPasswordToken()

    try {
        await user.save({ validateBeforeSave: false })

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({

        })
    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save({ validateBeforeSave: false })
        throw new Error('Failed to reset password')
    }

}

// For 'resetPassword' endpoint
const resetPassword = async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.query.resetToken).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now()}
    })

    if(!user) throw new Error('Invalid token from user!')

    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save

    sendTokenResponse(user, 200, res)
}

// For '/updatePassword' endpoint
const updatePassword = async (req, res, next) => {
    const user = await user.findById(req.user.id).select('+password')

    const passwordmatches = await user.matchPassword(req.body.password)

    if(!passwordMatches) throw new Error('Password is incorrect')

    user.password = req.body.newPassword

    await user.save()

    sendTokenResponse(user, 200, res)
}

//For '/logout' endpoint
const logout = async (req, res, next) => {
    res.cookie('token', 'none')
}

const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken()

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    res
    .status(statusCode)
    .cookie('token', token, options)
    .json(token)
}

module.exports = {
    getUsers, 
    createUser, 
    deleteUsers, 
    getUser, 
    putUser, 
    deleteUser,
    login,
    forgotPassword,
    resetPassword,
    updatePassword,
    logout
}