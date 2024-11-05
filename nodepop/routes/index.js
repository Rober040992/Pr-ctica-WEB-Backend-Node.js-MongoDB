import { Router } from 'express'
import { getProductsJSON } from '../controllers/homeController.js';

const router = Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Nodepop' })
})

// GET / - Muestra la home con la lista de productos
router.get('/products', getProductsJSON);

export default router

