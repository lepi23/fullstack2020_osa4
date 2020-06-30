const mongoose = require('mongoose')

const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true})

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})
module.exports = mongoose.model('Blog', blogSchema)