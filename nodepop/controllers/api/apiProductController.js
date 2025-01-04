import Product from "../../models/Product.js"
// iportamos el modelo del producto
export async function apiProductGetList(req, res, next){
    try{
        const limit = parseInt(req.query.limit) // || 5 para que aparezcan directamente un max de 5 productos
        const skip = parseInt(req.query.skip) || 0 //ejm: http://localhost:5555/api/products/?limit=3&skip=3
        const fields = req.query.fields //http://localhost:5555/api/products/?fields=name
        const filter = { }
        if (req.query.minPrice || req.query.maxPrice) { //verificamos que existan en la query
            filter.price = {}; //iniciamos campo price
            if (req.query.minPrice) {
                filter.price.$gte = req.query.minPrice;
            }
            if (req.query.maxPrice) {
                filter.price.$lte = req.query.maxPrice;
            }
        }
        
        if(req.query.name){
            filter.name = new RegExp(req.query.name, 'i')// Insensible a mayúsculas
        }

        const products = await Product.list(filter, limit, skip, fields)
        const totalProducts = await Product.countDocuments(filter)
        res.locals.products = products.length > 0 ? products : [];
        res.locals.totalProducts = totalProducts;
        res.json({ 
            results: products,
            count: totalProducts

        })
        // devolvemos una lista con todos los protuctos
    } catch (error){
        next(error)
    }
}

export async function apiProductGetOne(req, res, next) {
    try {
        const productId = req.params.productId
        const product = await Product.findById(productId)
        res.json({ result: product })
    } catch (error) {
        next(error)
    }
}