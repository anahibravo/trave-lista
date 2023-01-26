const mongoose = require('mongoose')

const DestinationSchema = new mongoose.Schema({
 title: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('Destination', DestinationSchema,'destinations')
mongoose.set('strictQuery', false);