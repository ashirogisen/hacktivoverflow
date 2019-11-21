const router = require('express').Router()
const questionController = require('../controllers/questionController')
const isLogin = require('../middlewares/isLogin')

router.post('/', isLogin, questionController.create)
router.get('/top', questionController.getTop)
router.get('/', isLogin, questionController.getByUserId)
router.get('/watchedtags', isLogin, questionController.getByWatchedTags)
router.delete('/:id', isLogin, questionController.delete)
router.get('/:id', isLogin, questionController.getDetails)
router.put('/:id', isLogin, questionController.update)
router.patch('/upvote/:id', isLogin, questionController.upvote);
router.patch('/downvote/:id', isLogin, questionController.downvote)
router.patch('/views/:id', questionController.updateViews)
// router.get('/search/:keyword', questionController.searchQuestion)

module.exports = router