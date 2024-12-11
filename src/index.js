const express = require('express')
const cors = require('cors')
const session = require('express-session');
const cookieParser = require('cookie-parser');

require('dotenv').config()

const { routes } = require('./routes')

const app = express()

app.use(express.json())
app.use(cors({ credentials: true, origin: ['http://localhost:3000', process.env.APP_URL] }))

app.use(session({
  secret: '6343a8f92695f826b1e3f9d53e600ef58a4a29e9',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 60 * 1000 // 30 minutos
  }
}))

app.use(cookieParser())

app.use(routes)

app.listen(process.env.PORT, () => {
  console.log('Servidor rodando na porta ' + process.env.PORT)
})