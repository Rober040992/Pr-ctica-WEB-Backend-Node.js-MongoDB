//ESTO ES MI HOMEPAGE CON LOS JSON
import { Router } from 'express'
import { getProductsJSON } from '../controllers/homeController.js';

const router = Router()

/* GET home page. using /homepage */
// GET / - Muestra la home con la lista de productos en formato JSON (pto 5 practica)
router.get('/', async (req, res, next) => {
  try {
    const products = await getProductsJSON(req, res, next);// Obtenemos los productos directamente desde el controlador
    res.render('homepage', { title: 'Nodepop', products });// Renderizamos la página de inicio pasando los productos

  } catch (error) {
    next(error);
  }
});

export default router

