import Product from '../models/Product.js'

// GET /
export async function homeController(req, res, next) {
    const userId = req.session.userId; // Identificamos el ID del usuario autenticado

    if (!userId) {
        // Si no hay usuario en sesión, redirigimos al login
        return res.redirect('/login');
    }

    try {
        // Buscamos los productos del usuario en la base de datos
        const products = await Product.find({ owner: userId });

        // Si el usuario tiene productos, los agregamos a res.locals para pasarlos a la vista
        
        res.locals.products = products.length > 0 ? products : [];

        // Renderizamos la vista de inicio con los productos del usuario
        res.render('home');
    } catch (error) {
        // En caso de error, lo pasamos al siguiente middleware de manejo de errores
        next(error);
    }
}
