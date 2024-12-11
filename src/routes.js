const { Router } = require('express')

const userController = require('./controllers/userController')
const messageController = require('./controllers/messageController')
const loginController = require('./controllers/loginController')

const authMiddleware = require('./middlewares/auth')

const routes = Router()

routes.get('/user', authMiddleware.isAuthenticated, userController.getAll)
routes.post('/user', authMiddleware.isAuthenticated, userController.create)
routes.delete('/user/:id', authMiddleware.isAuthenticated, userController.remove)

routes.get('/message', authMiddleware.isAuthenticated, messageController.getAll)
routes.post('/message', authMiddleware.isAuthenticated, messageController.create)
routes.delete('/message/:id', authMiddleware.isAuthenticated, messageController.remove)

routes.post('/login', loginController.login)
routes.post('/logout', authMiddleware.isAuthenticated, loginController.logout)

module.exports = { routes }