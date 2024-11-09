import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'
//este es el esquema modelo que vamos a usar cada vez que se crea un usuario y una funciona que hashea


// define el esquema modelo de usuario, con campos como email y password.
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