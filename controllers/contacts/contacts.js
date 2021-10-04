const createError = require('http-errors')
const { Contact } = require('../../models')

const listContacts = async (req, res, next) => {
  const contacts = await Contact.find({})
  res.json({ contacts })
}

const getContactById = async (req, res, next) => {
  const { contactId } = req.params
  const contact = await Contact.findById(contactId)
  if (!contact) throw createError(404, `Contact with id=${contactId} not found`)
  res.json({ contact })
}

const addContact = async (req, res) => {
  const result = await Contact.create(req.body)
  res.status(201).json({ status: 'success', code: 201, data: { result } })
}

const updateContact = async (req, res, next) => {
  const { contactId } = req.params
  // const { name, email, phone } = req.body
  const result = await Contact.findByIdAndUpdate(contactId, req.body)
  if (!result) throw createError(404, `Contact with id=${contactId} not found`)
  res.json({ status: 'success', code: 200, data: { result } })
}

const removeContact = async (req, res, next) => {
  const { contactId } = req.params
  const contact = await Contact.findByIdAndRemove(contactId)
  if (!contact) throw createError(404, `Contact with id=${contactId} not found`)
  res.json({ message: 'contact deleted' })
}

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findOneAndUpdate({ _id: contactId }, { $set: { favorite: true } }, { new: true })
  if (!result) throw createError(404, 'Not found')
  res.json({ status: 'success', code: 200, data: { result } })
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateStatusContact
}
