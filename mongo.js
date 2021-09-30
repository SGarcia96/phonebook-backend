require('dotenv').config()

const mongoose = require('mongoose')

const url = process.env.MONGO_DB_URI

mongoose.connect(url)
  .then(() => {
    console.log('database connected')
  }).catch(error => {
    console.log(error)
  })

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean
})

const Note = mongoose.model('Note', noteSchema)

Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})

// const note = new Note({
//   content: 'HTML is Easy',
//   date: new Date(),
//   important: true
// })

// note.save()
//   .then(result => {
//     console.log('note saved!')
//     mongoose.connection.close()
//   }).catch(error => {
//     console.log(error)
//   })
