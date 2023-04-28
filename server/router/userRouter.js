const userRouter = require('express').Router()
const userController = require('../controllers/userControllers')
const userService = require('../services/userService')

userController(userRouter, userService)

module.exports = userRouter
