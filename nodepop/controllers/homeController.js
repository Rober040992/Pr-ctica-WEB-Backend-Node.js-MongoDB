import Product from '../models/Product.js';

export const getProductsJSON = async () => {
    try {
        const products = await Product.find(); // Obtiene todos los productos
        return products; // Devuelve solo los productos
    } catch (error) {
        throw new Error('Error al obtener los productos JSON');
    }
};