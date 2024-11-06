import { Router } from 'express'

const router = Router()

/* GET home page. using  */
// GET / - Muestra la home
router.get('/', async (req, res, next) => {
  try {
    res.render('home');// Renderizamos la página de inicio pasando los productos
  } catch (error) {
    next(error);
  }
});

export default router

