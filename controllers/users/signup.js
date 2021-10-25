const { Conflict } = require('http-errors')
const gravatar = require('gravatar')

const { User } = require('../../models')

const signup = async(req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Email in use')
  }

  const avatarURL = gravatar.url(email)
  const newUser = new User({ email, avatarURL })
  newUser.setPassword(password)
  await newUser.save()

  res.status(201).json({ user: { email: `${email}`, subscription: 'starter' } })
}

module.exports = signup
