import { Router } from 'express'
import {
  login,
  register,
  logout,
  updateUser,
  getUserInfo
} from '../controllers/auth.controller.js'
import {
  loginValidator,
  updateValidator,
  userValidator,
  verifyToken
} from '../middlewares/authMiddleware.js'

const router = Router()

router.post('/login', loginValidator, login)

router.post('/register', userValidator, register)

router.post('/logout', logout)

router.put('/user', verifyToken, updateValidator, updateUser)

router.get('/user', verifyToken, getUserInfo)

export default router
