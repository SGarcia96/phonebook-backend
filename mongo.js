require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGO_DB_URI

mongoose.connect(url)
  .then((result) => {
    console.log('connected to MongoDB')
  }).catch(error => {
    console.log('error connecting to MongoDB', error.mesage)
  })
