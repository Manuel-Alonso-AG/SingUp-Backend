import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js'
import createToken from '../utils/jwt.js'

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const userFound = await User.findOne({ email })

    if (!userFound) return res.status(400).json({ message: 'Correo o contraseña incorrectos' })

    const isMatch = await bcryptjs.compare(password, userFound.password)
    if (!isMatch) return res.status(400).json({ message: 'Correo o contraseña incorrectos' })

    const token = await createToken({ id: userFound._id })
    res.cookie('token', token)

    res.status(200).json({ message: 'Datos correctos' })
  } catch (e) {
    res.status(500).json({ message: 'Error al mandar los datos' })
  }
}

export const logout = (req, res) => {
  res.cookie('token', '', {
    expires: new Date(0)
  })
  return res.sendStatus(200)
}

export const register = async (req, res) => {
  try {
    const { username, lastname, phone, email, password } = req.body

    const passHash = await bcryptjs.hash(password, 10)

    const userData = new User({
      username,
      lastname,
      phone,
      email,
      password: passHash
    })
    await userData.save()

    const token = await createToken({ id: userData._id })
    res.cookie('token', token)

    res.status(200).json({ message: 'Se registro correctamente' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getUserInfo = async (req, res) => {
  try {
    const userFound = await User.findById(req.user.id)
    if (!userFound) return res.status(400).json({ message: 'Ususario no encontrado' })
    res.status(200).json({ userFound })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateUser = async (req, res) => {
  try {
    const { username, lastname, phone, email, currentPassword, newPassword } = req.body
    const userFound = await User.findOne({ email })
    const currentUser = await User.findById({ _id: req.user.id })

    if (userFound && currentUser.email !== userFound.email) return res.status(400).json({ message: 'Usuario ya registrado' })

    let pass = currentUser.password
    const isMatch = await bcryptjs.compare(currentPassword, pass)
    if (!isMatch) return res.status(400).json({ message: 'La contraseña es incorrecta' })

    if (newPassword) {
      if (newPassword.length < 6) return res.status(400).json({ message: 'La nueva contraseña debe de tener minimo 6 caracteres' })
      pass = await bcryptjs.hash(newPassword, 10)
    }

    const userData = await User.findByIdAndUpdate(req.user.id, {
      username,
      lastname,
      phone,
      email,
      password: pass
    }, { new: true })

    if (!userData) return res.status(400).json({ message: 'No se actualizo' })
    res.status(200).json({ message: 'Actualizado correctamente' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
