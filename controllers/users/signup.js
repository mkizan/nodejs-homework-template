const { Conflict } = require('http-errors')
const gravatar = require('gravatar')
const { nanoid } = require('nanoid')

const { User } = require('../../models')
const { sendEmail } = require('../../helpers')

const signup = async(req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Email in use')
  }

  const avatarURL = gravatar.url(email)
  const verifyToken = nanoid()
  const newUser = new User({ email, avatarURL, verifyToken })
  newUser.setPassword(password)
  await newUser.save()

  const letter = {
    to: email,
    subject: 'Confirm signup',
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verifyToken}">Press on link for confirm your email</a>`
  }

  sendEmail(letter)

  res.status(201).json({ user: { email: `${email}`, subscription: 'starter' } })
}

module.exports = signup
