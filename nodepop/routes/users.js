import { Router } from 'express'
const router = Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('this is the users listing')
})

export default router
