import jwt from 'jsonwebtoken'
import createError from 'http-errors'

export function guard (req, res, next) {
    //sacar el TokenJWT de la cabecera, body o de la query
    const tokenJWT = req.get('Authorization') || req.body.jwt || req.query.jwt  //para leer la cabeceza .get()
    // controlar si no hay token con error
    if (!tokenJWT) {
        next(createError(401, 'NO TOKEN PROVIDED 🆘'))
        return
    }
    // compruebo que es valido
    jwt.verify(tokenJWT, process.env.JWT_SECRET, (err, payload) =>{
        if (err) {
            next(createError(401, 'Invalid Token JWT 🆘'))
        return
        }
        req.apiUserID = payload._id // creamos apiUserId para guardar el __id del usuario logeado en la request para poder leerlo en lo siguientes middleware
        next() // si es valido lo dejo pasar  
    } )

}