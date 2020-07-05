const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        unique: true 
    },
    name: String,
    passwordHash: {
        type: String,
        required: true
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ], 
})

userSchema.plugin(uniqueValidator)

userSchema
    .set('toJSON', {
        transform: (document, returnedObject) => {
            returnedObject.id = returnedObject._id.toString()
            delete returnedObject._id
            delete returnedObject.__v
            //salasanaa ei näytetä
            delete returnedObject.passwordHash
        }
    })

const User = mongoose.model('User', userSchema)

module.exports = User