const express = require('express')
const router = express.Router()
const todosController = require('../controllers/todos') 
//const profileController = require('../controllers/profile') 
const destinationController = require('../controllers/destination')
const { ensureAuth } = require('../middleware/auth')
const logoutController = require('../controllers/auth')

router.get('/', ensureAuth, todosController.getTodos)
//route to new destination
router.post('/createDestination', destinationController.createDestination)

router.post('/createTodo', todosController.createTodo)

router.put('/markComplete', todosController.markComplete)

router.put('/markIncomplete', todosController.markIncomplete)

router.delete('/deleteTodo', todosController.deleteTodo)

router.post('/logout', logoutController.logout)

module.exports = router