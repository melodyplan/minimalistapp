const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.Promise = global.Promise

const { PORT, DATABASE_URL } = require('./config')
const { Outfit } = require('./model')

const app = express()
app.use(express.static('public'))
app.use(bodyParser.json())

app.get('/outfits', (req, res) => {
  console.log('outfits')
  Outfit.find()
    .then(outfits => {
      console.log('outfits found')
      res.json(outfits)
    })
    .catch(err => {
      console.error(err)
      res.status(400).json({ message: 'Bad request error: a field is missing' })
    })
})

app.post('/outfits', (req, res) => {
  const requiredFields = ['headpiece', 'body', 'bottom', 'shoes', 'accessories']
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i]
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message)
      return res.status(400).send(message)
    }
  }

  Outfit.create({
    headpiece: req.body.headpiece,
    body: req.body.body,
    bottom: req.body.bottom,
    shoes: req.body.shoes,
    accessories: req.body.accessories
  })
    .then(outfit => res.status(201).json(outfit.apiRepr()))
    .catch(err => {
      console.error(err)
      res.status(500).json({ error: 'Something went wrong' })
    })
})

let server

function runServer(databaseUrl = DATABASE_URL, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err)
      }
      server = app
        .listen(port, () => {
          console.log(`Your app is listening on ${port}`)
          resolve()
        })
        .on('error', err => {
          mongoose.disconnect()
          reject(err)
        })
    })
  })
}

//close server and return promise
function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server')
      server.close(err => {
        if (err) {
          return reject(err)
        }
        resolve()
      })
    })
  })
}

if (require.main === module) {
  runServer().catch(err => console.error(err))
}

module.exports = { app, runServer, closeServer }
