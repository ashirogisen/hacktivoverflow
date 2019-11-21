const router = require('express').Router()
const forumController = require('../controllers/forumController')
const isLogin = require('../middlewares/isLogin')

router.get('/:id', forumController.getOne)
router.get('/', forumController.getAll)
router.post('/', isLogin, forumController.create)
router.patch('/:id', isLogin, forumController.addPost)
router.delete('/:id', forumController.delete)

module.exports = router