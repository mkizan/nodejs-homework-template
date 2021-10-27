const { Unauthorized } = require('http-errors')
const jwt = require('jsonwebtoken')
const { User } = require('../../models')

const { SECRET_KEY } = process.env

const login = async(req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user || !user.verify || !user.comparePassword(password)) {
    throw new Unauthorized('Email or password is wrong, or email not verify')
  }

  const payload = { id: user._id }
  const token = jwt.sign(payload, SECRET_KEY)

  await User.findByIdAndUpdate(user._id, { token })

  res.json({ token: token, user: { email: `${email}`, subscription: 'starter' } })
}

module.exports = login
