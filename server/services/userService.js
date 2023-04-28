let users = require('../datas/users.json')
require('dotenv').config()
const InvalidUserLoginException = require('../exception/InvalidUserLoginException')
const UserException = require('../exception/UserException')
const jwt = require('jsonwebtoken')

const userService = {}

userService.getAllUsers = () => {
  return users
}

userService.Login = (userPayload) => {
  const user = users.find(
    (element) =>
      element.username === userPayload.username &&
      element.password === userPayload.password,
  )

  if (!user) {
    throw new InvalidUserLoginException('Invalid username/password')
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.ACCESS_TOKEN_SECRET,
  )

  return {
    token,
  }
}

userService.Register = (userPayload) => {
  // Kiểm tra xem trong database đã có user chưa
  const filterUsers = users.filter(
    (element) => element.username === userPayload.username,
  )

  if (filterUsers.length > 0) {
    throw new UserException('Username is ready')
  }

  userPayload.id = users.length + 1
  users.push(userPayload)

  const token = jwt.sign(
    { id: userPayload.id, username: userPayload.username },
    process.env.ACCESS_TOKEN_SECRET,
  )

  return {
    token,
  }
}

module.exports = userService
