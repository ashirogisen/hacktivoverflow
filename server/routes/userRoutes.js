const router = require('express').Router()
const userController = require('../controllers/userController')
const isLogin = require('../middlewares/isLogin')

router.get('/', isLogin, userController.getUserData)
router.get('/allusers', userController.getAllUser)
router.post('/register', userController.register)
router.post('/login', userController.login)
router.patch('/addtag/:id', isLogin, userController.addToWatchTag)
router.patch('/removetag/:id', isLogin, userController.removeFromWatchTag)

module.exports = router