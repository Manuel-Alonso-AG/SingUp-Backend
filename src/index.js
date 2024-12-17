import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'
import { port } from './config.js'
import { connectDB } from './config/db.js'

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use('/api', authRoutes)

connectDB()

app.listen(port, () => {
  console.log(`Puerto en: ${port}`)
})
