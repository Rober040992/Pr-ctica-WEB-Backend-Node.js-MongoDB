import Product from '../models/Product.js'
//controlador de gestion de rutas del home 
// Controla la página de inicio. Verifica si el usuario está autenticado y, de ser así, muestra los productos asociados a ese usuario.
export async function homeController(req, res, next) {
    const userId = req.session.userId; // Identificamos el ID del usuario autenticado

    if (!userId) {
        // Si no hay usuario en sesión, redirigimos al login
        return res.redirect('/login');
    }

    try {
        //buscamos los params de la query para paginar o filtrar
        const limit = req.query.limit // || 5 para que aparezcan directamento un max de 5 productos
        const skip = req.query.skip || 0
        const filter = {
            owner: userId,
        }
        // Filtro por precio mínimo y máximo maximo ejm: http://localhost:5555/?maxPrice=20 o minimo ejm http://localhost:5555/?minPrice=20
        if (req.query.minPrice || req.query.maxPrice) {
            filter.price = {};
            if (req.query.minPrice) {
                filter.price.$gte = req.query.minPrice; //filter.price.$gte es parte de la sintaxis de MongoDB para realizar consultas con operadores de comparación.
            }
            if (req.query.maxPrice) {
                filter.price.$lte = req.query.maxPrice;// $lte Less Than or Equal
            }
        }

        // Buscamos los productos del usuario en la base de datos
        const products = await Product.list(filter, limit, skip); //en orden como en el model: http://localhost:4444/?limit=3&skip=1
        //aqui dentro hay productos totales: falta implementar la logica
        const totalProducts = await Product.countDocuments(filter)
        // Si el usuario tiene productos, los agregamos a res.locals para pasarlos a la vista
        res.locals.products = products.length > 0 ? products : [];
        res.locals.totalProducts = totalProducts;

        // Renderizamos la vista de inicio con los productos del usuario
        res.render('home');
    } catch (error) {
        // En caso de error, lo pasamos al siguiente middleware de manejo de errores
        next(error);
    }
}

