import { secretToken } from '../config.js'
import { check, validationResult } from 'express-validator'
import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
const { verify } = jwt

export const verifyToken = (req, res, next) => {
  try {
    const { token } = req.cookies
    if (!token) return res.status(400).json({ message: 'Sin acceso' })

    verify(token, secretToken, (err, user) => {
      if (err) return res.status(400).json({ message: 'Token invalido' })
      req.user = user
      return next()
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const loginValidator = [
  check('email')
    .notEmpty().withMessage('Ingrese un correo')
    .isEmail().withMessage('El correo no es valido')
    .custom(async value => {
      const userFound = await User.findOne({ email: value })
      if (!userFound) throw new Error('Correo o contraseña incorrecta')
    })
    .escape(),
  check('password')
    .notEmpty().withMessage('Ingrese una contraseña')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener minimo 6 dijitos')
    .escape(),
  (req, res, next) => {
    try {
      validationResult(req).throw()
      return next()
    } catch (err) {
      res.status(400).json({ error: err.array() })
    }
  }
]

export const updateValidator = [
  check('username')
    .notEmpty().withMessage('Ingrese un nombre')
    .escape(),
  check('lastname')
    .notEmpty().withMessage('Ingrese un apellido')
    .escape(),
  check('currentPassword')
    .notEmpty().withMessage('Ingrese su contraseña')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener minimo 6 dijitos')
    .escape(),
  check('newPassword')
    .escape(),
  check('email')
    .notEmpty().withMessage('Ingrese un correo')
    .isEmail().withMessage('El correo no es valido')
    .escape(),
  check('phone')
    .notEmpty().withMessage('Ingrese un numero telefonico')
    .isMobilePhone().withMessage('El numero telefonico no es valido'),
  (req, res, next) => {
    try {
      validationResult(req).throw()
      return next()
    } catch (err) {
      res.status(400).json({ error: err.array() })
    }
  }
]

export const userValidator = [
  check('username')
    .notEmpty().withMessage('Ingrese un nombre')
    .escape(),
  check('lastname')
    .notEmpty().withMessage('Ingrese un apellido')
    .escape(),
  check('password')
    .notEmpty().withMessage('Ingrese una contraseña')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener minimo 6 dijitos')
    .escape(),
  check('email')
    .notEmpty().withMessage('Ingrese un correo')
    .isEmail().withMessage('El correo no es valido')
    .custom(async value => {
      const userFound = await User.findOne({ email: value })
      if (userFound) throw new Error('El correo ya esta reguistrado')
    })
    .escape(),
  check('phone')
    .notEmpty().withMessage('Ingrese un numero telefonico')
    .isMobilePhone().withMessage('El numero telefonico no es valido'),
  (req, res, next) => {
    try {
      validationResult(req).throw()
      return next()
    } catch (err) {
      res.status(400).json({ error: err.array() })
    }
  }
]
