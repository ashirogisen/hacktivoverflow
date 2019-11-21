const router = require('express').Router()
const chatController = require('../controllers/chatController')
const isLogin = require('../middlewares/isLogin')

router.post('/', isLogin, chatController.create)
router.get('/', chatController.getAll)

module.exports = router