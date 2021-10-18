const { User } = require('../../models')

const current = async (req, res) => {
  const { _id } = req.user
  console.log(_id)
  const { email } = await User.findById({ _id })
  console.log(email)
  res.json({ email: `${email}`, subscription: 'starter' })
}

module.exports = current
