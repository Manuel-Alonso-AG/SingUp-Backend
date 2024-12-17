import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  username: { type: String, required: true, trim: true },
  lastname: { type: String, trim: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, trim: true }
}, { timestamps: true }
)

export default model('User', userSchema)
