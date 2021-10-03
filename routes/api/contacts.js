const express = require('express')

const { controllerWrapper, validation } = require('../../middlewares')
// const { contactSchema } = require('../../schemas')
const { joiSchema } = require('../../models/contact')
const { contacts: ctrl } = require('../../controllers/contacts')

const router = express.Router()

router.get('/', validation(joiSchema), controllerWrapper(ctrl.listContacts))

router.get('/:contactId', validation(joiSchema), controllerWrapper(ctrl.getContactById))

router.post('/', validation(joiSchema), controllerWrapper(ctrl.addContact))

router.delete('/:contactId', validation(joiSchema), controllerWrapper(ctrl.removeContact))

router.put('/:contactId', validation(joiSchema), controllerWrapper(ctrl.updateContact))

router.patch('/:contactId/favorite', validation(joiSchema), controllerWrapper(ctrl.updateStatusContact))

module.exports = router
