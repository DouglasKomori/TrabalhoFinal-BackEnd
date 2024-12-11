const { messages, listMessages, insertMessage, removeMessage } = require('../database/messages')

const getAll = async (req, res) => {
  return res.status(200).json(listMessages())
}

const create = async (req, res) => {
  const { message, userId } = req.body

  const errors = [];

  if (!message)
    errors.push('message is invalid')

  if (!userId)
    errors.push('userId is invalid')

  if (errors.length > 0)
    return res.status(400).json({ errors })

  const newMessage = insertMessage({ message, createdAt: (new Date()).toISOString(), userId });

  if (!newMessage)
    return res.status(500).json({ errors: ['internal server error'] })

  return res.status(200).json(messages)
}

const remove = async (req, res) => {
  const { id } = req.params

  if (!id)
    return res.status(400).json({ errors: ['id is invalid'] })

  const result = removeMessage(id)

  if (!result)
    return res.status(404).json({ erorrs: ['not found'] })

  return res.status(200).json({ msg: 'deleted' })
}

module.exports = { getAll, create, remove }