import { join } from 'node:path'
import express, { json, urlencoded } from 'express';
import createError from 'http-errors'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import connectMongoose from './config/mongooseConfig.js'
import * as homeController from './controllers/homeController.js'
import * as loginController from './controllers/loginController.js'
import * as productController from './controllers/productController.js'
import * as sessionManager from './config/sessionManager.js'
//en este file app.js configuramos la aplicación de Express, definimos el uso de los middlewares y las rutas

await connectMongoose()
console.log('Conectado a MongoDB')

const app = express()

//aqui conectamos con header y renderizamos la app
app.locals.appName = 'nodepop'

// view engine setup
app.set('views', join(import.meta.dirname, 'views')) //MOTOR DE PLANTILLS
app.set('view engine', 'ejs')

// middlewares

// morgan logger for http requests logs
app.use(logger('dev'))
// transforms json objects into js objects
app.use(express.json())
// transforms data sent by a form to a js object
app.use(express.urlencoded({ extended: false }))
// cookie parser to get cookies from client
app.use(cookieParser())
// set the folder where statis resources will be served
app.use(express.static(join(import.meta.dirname, 'public')))

// Routing rutas de la aplicacion

app.use(sessionManager.middleware, sessionManager.useSessionInViews) //aqui usamos el sessionManager

/*public pages
/login: Muestra el formulario de inicio de sesión
 */
app.get('/', homeController.homeController)
app.get('/login', loginController.loginController)
app.post('/login', loginController.postLogin)
app.all('/logout', loginController.logout)

// private pages
/*
/product/new: Permite a un usuario autenticado crear un producto
/product/delete/: Permite a un usuario autenticado eliminar un producto.
*/
//obtiene un producto
app.get('/product/new', sessionManager.isLoggedIn, productController.productController)
//crea un producto 
app.post('/product/new', sessionManager.isLoggedIn, productController.postNew)
//elimina un producto creado
app.get('/product/delete/:productId', sessionManager.isLoggedIn, productController.deleteProduct)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export default app