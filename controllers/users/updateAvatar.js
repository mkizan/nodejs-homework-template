const fs = require('fs/promises')
const path = require('path')
const { User } = require('../../models')

const updateAvatar = async(req, res, next) => {
  const { _id } = req.user
  const { path: tempDir, originalname } = req.file
  // const [extension] = originalname.split('.').reverse()
  // const filename = `${_id}.${extension}`
  const filename = `${_id}-${originalname}`
  const uploadDir = path.join(__dirname, '../../', 'public/avatars', filename)
  try {
    await fs.rename(tempDir, uploadDir)
    const image = path.join('avatars', filename)
    await User.findByIdAndUpdate(_id, { avatarURL: image })
    res.json({ avatarURL: image })
  } catch (error) {
    await fs.unlink(tempDir)
    next(error)
  }
}

module.exports = updateAvatar
