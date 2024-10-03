import express from 'express'
import { loginUser,signupUser,adminLogin } from '../controllers/userController.js'

const  router = express.Router();

router.post('/signup',signupUser)
router.post('/signin',loginUser)
router.post('/admin',adminLogin)

export default router ;