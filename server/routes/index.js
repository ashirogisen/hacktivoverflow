const router = require('express').Router()
const userRoutes = require('./userRoutes')
const questionRoutes = require('./questionRoutes')
const answerRoutes = require('./answerRoutes')
const tagRoutes = require('./tagRoutes')
const forumRoutes = require('./forumRoutes')
const chatRoutes = require('./chatRoutes')

router.use('/', userRoutes)
router.use('/questions', questionRoutes)
router.use('/answers', answerRoutes)
router.use('/tags', tagRoutes)
router.use('/forums', forumRoutes)
router.use('/chats', chatRoutes)

module.exports = router