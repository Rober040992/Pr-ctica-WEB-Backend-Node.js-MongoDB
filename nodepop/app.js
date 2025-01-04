import { join } from 'node:path'
import express, { json, urlencoded } from 'express';
import createError from 'http-errors'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import connectMongoose from './config/mongooseConfig.js'
import * as homeController from './controllers/homeController.js'
import * as loginController from './controllers/loginController.js'
import * as productController from './controllers/productController.js'
import * as sessionManager from './config/sessionManager.js'
import upload from './config/uploadConfig.js';
import i18n from './config/i18nConfig.js';
import * as langController from './controllers/langController.js'
//controllers del API:
import * as apiPorductController from './controllers/api/apiProductController.js'

//en este file app.js configuramos la aplicación de Express, definimos el uso de los middlewares y las rutas

await connectMongoose() // esperamos a la conexion de la DB
console.log('Conectado a MongoDB')

const app = express() //inicializamos express

app.locals.appName = 'nodepop'//aqui conectamos con header y renderizamos la app

// view engine setup
app.set('views', join(import.meta.dirname, 'views')) //MOTOR DE PLANTILLS
app.set('view engine', 'ejs')

// middlewares

app.use(logger('dev'))    // morgan logger for http requests logs
app.use(express.json())   // transforms json objects into js objects
app.use(express.urlencoded({ extended: false }))  // transforms data sent by a form to a js object (for sent urlencoded forms)
app.use(cookieParser())   // cookie parser to get cookies from client
app.use(express.static(join(import.meta.dirname, 'public')))    // set the folder where statis resources will be served

// API ROUTES
app.get('/api/products', apiPorductController.apiProductGetList)
app.get('/api/products/:productId', apiPorductController.apiProductGetOne) //solo un producto por _id
app.post('/api/products', upload.single('Image'), apiPorductController.apiCreateNewProduct)
app.put('/api/products/:productId',upload.single('Image'), apiPorductController.apiProductUpdate)

app.use(sessionManager.middleware, sessionManager.useSessionInViews) //aqui usamos el sessionManager
app.use(i18n.init)// lee la cabecera "accept lenguage" de la peticion y selecciona fichero de idioma

// WEBSITE ROUTES
// peticion tipo get a /change-locale/:locale(en o es) llama al langController a traves de parametro en ruta
app.get('/change-locale/:locale', langController.changeLocale) 


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
app.post('/product/new', sessionManager.isLoggedIn,upload.single('Image'), productController.postNew)
//elimina un producto creado
app.get('/product/delete/:productId', sessionManager.isLoggedIn, productController.deleteProduct)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development

  // API errors send in JSON
  if(req.url.startsWith('/api')) {
    res.json({error: err.message})
    return
  }

  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export default app