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
        //buscamos los params de la query para paginar
        const limit = req.query.limit
        const skip = req.query.skip
        const filter = {
            owner: userId
        }
        
        // Buscamos los productos del usuario en la base de datos
        const products = await Product.list(filter, limit, skip); //en orden como en el model: http://localhost:4444/?limit=3&skip=1

        
        //aqui dentro hay productos totales: falta implementar la logica
        const totalProducts = await Product.countDocuments(filter)

        // Si el usuario tiene productos, los agregamos a res.locals para pasarlos a la vista
        res.locals.products = products.length > 0 ? products : [];

        // Renderizamos la vista de inicio con los productos del usuario
        res.render('home');
    } catch (error) {
        // En caso de error, lo pasamos al siguiente middleware de manejo de errores
        next(error);
    }
}

