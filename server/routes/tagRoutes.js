const router = require('express').Router()
const tagController = require('../controllers/tagController')
const isLogin = require('../middlewares/isLogin')

router.post('/', tagController.create)
router.get('/', tagController.getAll)
router.get('/:id', isLogin, tagController.getOne)
router.get('/filtered/:id', tagController.getOneFiltered)

module.exports = router