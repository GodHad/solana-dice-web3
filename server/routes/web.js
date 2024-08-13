// packages
const router = require('express').Router()

// controllers
const {
    aboutController,
    contactController,
    homeController,
    weatherController,
    registerController,
    diceController
} = require('../controllers/')

//middlewares
const {
    login,
    modifyResponse,
    register
    } = require('../middlewares')

router.use(modifyResponse)

router.get('/', homeController.home)

router.get('/contact', contactController.contact)

router.get('/about', aboutController.about)

router.get('/dice', login.requireLogin, diceController.view)

module.exports = router;