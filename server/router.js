const rootRouter = require('express').Router()
const userRouter = require('./router/userRouter')

rootRouter.use('/', userRouter)

rootRouter.use(require('./middleware/payloadFormatMiddleware'))
rootRouter.use(require('./middleware/exceptionHandleMiddleware'))

module.exports = rootRouter
