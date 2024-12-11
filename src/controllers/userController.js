const { users, insertUser, removeUser } = require('../database/user')

const getAll = async (req, res) => {
  return res.status(200).json(users)
}

const create = async (req, res) => {
  const { name, birthDate, nickName } = req.body

  const errors = [];

  if (!name)
    errors.push('name is invalid')

  if (!birthDate)
    errors.push('birthDate is invalid')

  if (!nickName)
    errors.push('nickName is invalid')

  if (errors.length > 0)
    return res.status(400).json({ errors })

  const newUser = insertUser({ name, birthDate, nickName });

  if (!newUser)
    return res.status(500).json({ errors: ['internal server error'] })

  return res.status(200).json(users)
}

const remove = async (req, res) => {
  const { id } = req.params

  if (!id)
    return res.status(400).json({ errors: ['id is invalid'] })

  const result = removeUser(id)

  if (!result)
    return res.status(404).json({ erorrs: ['not found'] })

  return res.status(200).json({ msg: 'deleted' })
}

module.exports = { getAll, create, remove }