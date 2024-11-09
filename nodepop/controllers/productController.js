import createError from 'http-errors'
import Product from '../models/Product.js'
//funiones de controlador para la creacion y eliminacion de productos
/*
Controla la creación y eliminación de productos.
Verifica que el usuario esté autenticado y 
sea el propietario del producto antes de permitirle eliminarlo.
*/
export function productController(req, res, next) {
    res.render('new-product')
}

export async function postNew(req, res, next) {
    try {
        const userId = req.session.userId
        const { name, price, tag } = req.body

        // TODO validaciones

        // creo una instancia de producto en memoria
        const product = new Product({
            name,
            price,
            tag,
            owner: userId
        })

        // guardar en base de datos
        await product.save()

        res.redirect('/')
    } catch (err) {
        next(err)
    }
}

export async function deleteProduct(req, res, next) {
    const userId = req.session.userId
    const productId = req.params.productId

    // validar que el elemento que queremos borrar es propiedad del usuario logado!!!!!
    const product = await Product.findOne({ _id: productId })

    // verificar que existe
    if (!product) {
        console.warn(`WARNING - el usuario ${userId} está intentando eliminar un producto inexistente`)
        return next(createError(404, 'Not found'))
    }

    if (product.owner.toString() !== userId) {
        console.warn(`WARNING - el usuario ${userId} está intentando eliminar un agente de otro usuario`)
        return next(createError(401, 'Not authorized'))
    }

    await Product.deleteOne({ _id: productId })

    res.redirect('/')

}