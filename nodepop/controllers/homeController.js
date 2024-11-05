import Product from '../models/Product.js';

export const getProductsJSON = async (req, res, next) => {
    try {
        const products = await Product.find(); // Obtiene todos los productos
        res.json(products); // Devuelve en formato JSON
    } catch (error) {
        next(error);
    }
};