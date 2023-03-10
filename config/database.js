const mongoose = require('mongoose')

//Function that connects to DB through mongoose
const connectDB = async () => {
  try {
    mongoose.connect(process.env.DB_STRING)

    console.log (`MongoDB Connected!`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}


module.exports = connectDB
