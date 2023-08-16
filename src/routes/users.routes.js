const { Router } = require('express')
const multer = require('multer')

const uploadConfig = require('../configs/upload')
const UsersController = require('../controllers/UsersController')
const ProfilePicturesController = require('../controllers/PicturesController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const usersController = new UsersController()
const profilePicturesController = new ProfilePicturesController()

const upload = multer(uploadConfig.MULTER)

const usersRoutes = Router()

usersRoutes.post('/', usersController.create)
usersRoutes.put('/', ensureAuthenticated, usersController.update)
usersRoutes.patch('/avatar', ensureAuthenticated, upload.single('avatar'), profilePicturesController.update)

module.exports = usersRoutes