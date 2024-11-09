//gestion de sesiones
import session from 'express-session'
import MongoStore from 'connect-mongo'

const INACTIVITY_EXPIRATION_2_DAYS = 1000 * 60 * 60 * 24 * 2

// Configura las sesiones para la aplicación, estableciendo la duración y la seguridad de la sesión.
export const middleware = session({
    name: 'nodeapp-session',
    secret: 'asdasdalsñkdasqkpowjepcmasdapkqwe',
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: INACTIVITY_EXPIRATION_2_DAYS },
    // las sesiones se guardan en MongoDB
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/nodepop'
    })
})

//este es para que las vistas puedan acceder a la sesion para ver si esta autenticado o no
export function useSessionInViews(req, res, next) {
    res.locals.session = req.session
    next()
}
//Middleware que redirige a la página de inicio de sesión si un usuario intenta acceder a una página protegida sin autenticarse.
export function isLoggedIn(req, res, next) {
    if (!req.session.userId) {
        res.redirect('/login')
        return
    }
    next()
}