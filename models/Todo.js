const mongoose = require('mongoose')
/*
mongoose is going to handle all the stuff we need to talk to the db with a schema
moongose gives us a way to model our application data
helps us create each "document" or object
*/

const TodoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Todo', TodoSchema)
mongoose.set('strictQuery', false);