const { v4 } = require('uuid')

const { users } = require('./user')

const messages = [];

const listMessages = () => {
  const userIds = {}

  for (const user of users) {
    userIds[user.id] = user.name
  }

  const result = [];

  for (const message of messages) {
    result.push({
      user: userIds[message.userId],
      ...message
    })
  }

  return result
}

const insertMessage = (message) => {
  const newMessage = { id: v4(), ...message };
  messages.push(newMessage)
  return newMessage
}

const removeMessage = (id) => {
  const index = messages.findIndex((message) => message.id === id)
  if (index !== -1) {
    messages.splice(index, 1)
    return true
  }

  return false
}

module.exports = {
  messages,
  listMessages,
  insertMessage,
  removeMessage
}