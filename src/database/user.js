const { v4 } = require('uuid')

const users = [];

const insertUser = (user) => {
  const newUser = { id: v4(), ...user };
  users.push(newUser)
  return newUser
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id)
  if (index !== -1) {
    users.splice(index, 1)
    return true
  }

  return false
}

module.exports = {
  users,
  insertUser,
  removeUser
}