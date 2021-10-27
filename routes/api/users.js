const express = require('express')

const { controllerWrapper, validation, authenticate, upload } = require('../../middlewares')
const { joiSchema } = require('../../models/user')
const { users: ctrl } = require('../../controllers')

const router = express.Router()

router.post('/signup', validation(joiSchema), controllerWrapper(ctrl.signup))

router.post('/login', validation(joiSchema), controllerWrapper(ctrl.login))

router.post('/logout', authenticate, controllerWrapper(ctrl.logout))

router.get('/current', authenticate, controllerWrapper(ctrl.current))

router.patch('/avatars', authenticate, upload.single('avatar'), controllerWrapper(ctrl.updateAvatar))

router.get('/verify/:verificationToken', controllerWrapper(ctrl.verify))

router.post('/verify', controllerWrapper(ctrl.resendEmail))

module.exports = router
