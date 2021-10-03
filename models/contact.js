const { Schema, model } = require('mongoose')
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
  }
})

const joiSchema = Joi.object({ name: Joi.string().min(2), email: Joi.string(), phone: Joi.string().min(10), favorite: Joi.boolean() })

const Contact = model('contact', contactSchema)

module.exports = {
  Contact,
  joiSchema
}

// 1) схема (описание типов данных, похоже на PropTypes)
// 2) модель (создание обьекта)
// 3) запрос через async/await
