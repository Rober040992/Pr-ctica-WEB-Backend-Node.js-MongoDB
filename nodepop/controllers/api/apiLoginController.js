import createError from 'http-errors'
import jwt from 'jsonwebtoken'
import User from "../../models/User.js"

export async function loginJWT(req, res, next) {
    try {
        const { email, password } = req.body        //primero recojo los params de entrada

        const user = await User.findOne({ email: email.toLowerCase() })     // buscar el usuario en la base de datos

        
        if (!user || !(await user.comparePassword(password))) { // si no lo encuentro, o la contraseña o user no coincide --> error
            next(createError(401, 'API invalid credentials'))
            return
        }
        // si lo encuentro genero un JWT
        jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { 
            expiresIn: '2d' 
        }, (err, tokenJWT) => {
            if(err) {
                next(err)
                return
            }
            // y ahora lo tenemos que devolver
            res.json({ tokenJWT })
        })

    } catch (error) {
        next(error)
    }
}