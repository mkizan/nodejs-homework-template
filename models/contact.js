const { Schema, model, SchemaTypes } = require('mongoose')
const Joi = require('joi')

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, 'The contact must have a name'],
    minlength: 2,
  },
  email: {
    type: String,
    required: [true, 'The contact must have an email'],
    unique: [true, 'The email must have be unique']
  },
  phone: {
    type: String,
    required: [true, 'The contact must have a phone number'],
    minlength: 10,
    unique: [true, 'The phone number must have be unique']
  },
  favorite: {
    type: Boolean,
    default: false
  },
  owner: {
    type: SchemaTypes.ObjectId,
    ref: 'user'
  }
})

const joiSchema = Joi.object({ name: Joi.string().min(2), email: Joi.string(), phone: Joi.string().min(10), favorite: Joi.boolean() })

const Contact = model('contact', contactSchema)

module.exports = {
  Contact,
  joiSchema
}
