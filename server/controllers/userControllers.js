const InvalidArgumentException = require('../exception/InvalidArgumentException')
const InvalidUserLoginException = require('../exception/InvalidUserLoginException')

const userControllers = (router, service) => {
  const userService = service

  router.get('/users', (_, res, next) => {
    const users = userService.getAllUsers()
    res.data = users
    next()
  })

  router.post('/login', (req, res, next) => {
    // check body

    const userPayload = req.body

    if (!userPayload) {
      throw new InvalidArgumentException('request body is invalid')
    }

    const user = userService.Login(userPayload)

    if (!user) {
      throw new InvalidUserLoginException(exception.message)
    }

    res.statusCode = 200
    res.data = user

    next()
  })

  router.post('/register', (req, res, next) => {
    // check body

    const userPayload = req.body

    if (!userPayload) {
      throw new InvalidArgumentException('request body is invalid')
    }

    const data = userService.Register(userPayload)

    res.statusCode = 200
    res.data = data

    next()
  })
}

module.exports = userControllers
