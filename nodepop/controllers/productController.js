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
        const { name, price, tags } = req.body
        // TODO validaciones
        // Validar si se subió un archivo
        const image = req.file ? req.file.filename : null;
        // creo una instancia de producto en memoria
        const product = new Product({
            name,
            price,
            tags,
            owner: userId,
            Image: image
        })

        // guardar en base de datos
        await product.save()

        res.redirect('/')
    } catch (err) {
        next(err)
    }
}



//middleware de eliminacion de productos
export async function deleteProduct(req, res, next) {
    const userId = req.session.userId
    const productId = req.params.productId

    // validar que el elemento que queremos borrar es propiedad del usuario logado!!!!!
    const product = await Product.findOne({ _id: productId })

    // verificar que el producto existe
    if (!product) {
        console.warn(`WARNING - el usuario ${userId} está intentando eliminar un producto inexistente`)
        return next(createError(404, 'Not found'))
    }
    //verificar que el owner coincide con el userId , si no lanzo un warn
    if (product.owner.toString() !== userId) {
        console.warn(`WARNING - el usuario ${userId} está intentando eliminar un producto de otro usuario`)
        return next(createError(401, 'Not authorized'))
    }

    await Product.deleteOne({ _id: productId })

    res.redirect('/')

}