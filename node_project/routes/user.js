const express = require('express');
const router = express.Router();
const {
    getUsers,
    createUser,
    deleteUsers,
    getUser,
    putUser,
    deleteUser,
    login,
    forgotPassword,
    resetPassword,
    logout
} = require('../controllers/userController')
const adminValidator = require('../middlewares/utils/validators')
const protectedRoute = require('../middlewares/auth')

router.route('/')
    .get(adminValidator, protectedRoute, getUsers)
    .post(createUser)
    .delete(protectedRoute, deleteUsers)

router.route('/login')
    .post(login)

router.route('/forgotPassword')
    .post(forgotPassword)

router.route('/resetPassword')
    .put(protectedRoute, resetPassword)

router.route('/logout')
    .get(protectedRoute, logout)

router.route('/:userId')
    .get(protectedRoute, getUser)
    .put(putUser)
    .delete(deleteUser)

module.exports = router;