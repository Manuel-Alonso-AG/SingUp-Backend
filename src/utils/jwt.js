import { secretToken } from '../config.js'
import jwt from 'jsonwebtoken'

const createToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      secretToken,
      { expiresIn: '1d' },
      (err, token) => {
        if (err) reject(err)
        resolve(token)
      })
  })
}

export default createToken
