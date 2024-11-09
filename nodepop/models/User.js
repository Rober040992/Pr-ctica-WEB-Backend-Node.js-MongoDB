import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'

// creating a schema model for the inital user
const userSchema = new Schema({
    email: { type: String, unique: true },
    password: String
})

// hashing the password
userSchema.statics.hashPassword = function (clearPassword) {
    return bcrypt.hash(clearPassword, 7)
}
//
userSchema.methods.comparePassword = function (clearPassword) {
    return bcrypt.compare(clearPassword, this.password)
  }

const User = mongoose.model('User', userSchema)

export default User