const { BadRequest } = require('http-errors')
const { User } = require('../../models')
const { sendEmail } = require('../../helpers')

const resendEmail = async(req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    throw new BadRequest('Missing required field email')
  }
  if (user.verify) {
    throw new BadRequest('Verification has already been passed')
  }
  if (!user.verify) {
    const verifyToken = user.verifyToken
    const letter = {
      to: email,
      subject: 'Confirm signup',
      html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verifyToken}">Press on link for confirm your email</a>`
    }

    sendEmail(letter)
    res.status(200).json({ message: 'Verification email sent' })
  }
}

module.exports = resendEmail
