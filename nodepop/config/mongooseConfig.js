//conexion a mongoDB. Este archivo establece la conexión y maneja errores de conexión.
import mongoose from 'mongoose' 

mongoose.connection.on('error', err => {
    console.log('Error de conexión', err)
  })
  export default function connectMongoose() {
    return mongoose.connect('mongodb://127.0.0.1:27017/nodepop')
    .then(mongoose => mongoose.connection)
  }