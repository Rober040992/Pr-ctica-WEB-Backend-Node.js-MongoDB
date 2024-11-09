import readline from 'node:readline'
import connectMongoose from './config/mongooseConfig.js'
import Product from './models/Product.js'
import User from './models/User.js'
/*
Este archivo es un script para inicializar la base de datos con datos de ejemplo
Eliminar todos los usuarios y productos existentes.
Crear usuarios de ejemplo y productos asociados a esos usuarios
*/

const connection = await connectMongoose()
console.log('Connected to MongoDB:', connection.name)
const questionResponse = await ask('Are you sure you want to empty the database and create initial data?')
if (questionResponse.toLowerCase() !== 'yes') {
    console.log('Operation aborted.')
    process.exit()
}

await initUsers()
await initProducts()

//closing
connection.close()

async function initProducts() {
    // delete all products
    const deleteResult = await Product.deleteMany()
    console.log(`Deleted ${ deleteResult.deletedCount } product.`)

    //aqui estoy declarando las variables e insertandole los emails por orden 
    const [rober, rober1, rober2] = await Promise.all([
        User.findOne({ email: 'rober@example.com' }),
        User.findOne({ email: 'rober1@example.com' }),
        User.findOne({ email: 'rober2@example.com' })
      ])

    // create initial products
    const insertResult = await Product.insertMany([
        { name: 'car', price: 10000, owner: rober._id, tags:['motor', "lifestyle"]},
        { name: 'driller', price: 50, owner: rober1._id, tags:['work'] },
        { name: 'fridge', price: 150, owner: rober2._id, tags:['mobile'] }
    ])
    console.log(`Created ${ insertResult.length } product.`) 
}

async function initUsers() {
    // delete all users
    const deleteResult = await User.deleteMany()
    console.log(`Deleted ${deleteResult.deletedCount} users.`)
    // create initial users
    const insertResult = await User.insertMany([
      { email: 'rober@example.com', password: await User.hashPassword('1234') },
      { email: 'rober1@example.com', password: await User.hashPassword('1234') },
      { email: 'rober2@example.com', password: await User.hashPassword('1234') }
    ])
    console.log(`Created ${insertResult.length} users.`)
  }

  // ask the user thru the terminal and wait for a answer using Promises
function ask(questionText) {
    return new Promise((resolve, reject) => {
        const consoleInterface = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
        consoleInterface.question(questionText, answer => {
            consoleInterface.close()
            resolve(answer)
        })
    })
}