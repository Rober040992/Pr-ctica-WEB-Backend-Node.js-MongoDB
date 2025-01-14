import Product from "../../models/Product.js"
// iportamos el modelo del producto
//      API CRUD METHODS

export async function apiProductGetList(req, res, next){
    try{
        const apiUserId = req.apiUserID
        const limit = parseInt(req.query.limit) // || 5 para que aparezcan directamente un max de 5 productos
        const skip = parseInt(req.query.skip) || 0 //ejm: http://localhost:5555/api/products/?limit=3&skip=3
        const fields = req.query.fields //http://localhost:5555/api/products/?fields=name
        const filter = { owner: apiUserId} // pasandole este filtro directamente solo nos da los productos propiedad del user
        
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

        const [products, totalProducts] = await Promise.all([
            Product.list(filter, limit, skip, fields),
            Product.countDocuments(filter)
        ])

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
        const apiUserId = req.apiUserID
        //obtenemos la peticion del los parametros de la ruta
        const productId = req.params.productId
        // buscamos el product en la base de datos filtrado
        const product = await Product.findOne({ _id: productId, owner: apiUserId })
        // devolvemos un objeto en forma de json
        res.json({ result: product })
    } catch (error) {
        next(error)
    }
}

export async function apiCreateNewProduct(req, res, next) {
    try {
        const apiUserId = req.apiUserID
        // obtenemos los datos del form del body
        const productBodyData = req.body
        //creando instancia del producto en memoria y le pasamos el body del newProduct
        const newProduct = new Product(productBodyData)
        newProduct.owner = apiUserId //para decirle quien es el propietario
        //le asignamos la propiedad image (opcional)
        newProduct.Image = req.file?.filename

        //lo guardamos
        const savedProduct = await newProduct.save()
        // devolvemos
        res.status(201).json({ result: savedProduct })
    } catch (error) {
        next(error)
    }
}

export async function apiProductUpdate(req, res, next) {
    try {
        //recogemos datos de entrara
        const productId = req.params.productId
        const productData = req.body
        productData.Image = req.file?.filename //le asignamos el file?
        //actualizar:
        const updatedProduct = await Product.findByIdAndUpdate(productId, productData, { new: true }) //new:true para obtener el doc updated
        res.json({ result: updatedProduct })
    } catch (error) {
        next(error)
    }
}

export async function apiProductDelete(req, res, next) {
    try {
         //recogemos del los parametros de la ruta
         const productId = req.params.productId
         // buscamos el product en la DB pasandole el filtro de el que vamos a borrar
         await Product.deleteOne({ _id: productId })

        res.json()
    } catch (error) {
        next(error)
    }
}