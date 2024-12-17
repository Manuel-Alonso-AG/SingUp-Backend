import { connect } from 'mongoose'
import { mongoodbUrl } from '../config.js'

export const connectDB = async () => {
  try {
    const conn = await connect(mongoodbUrl)
    console.info(`- Connect DB - ${conn.connection.host}`)
  } catch (error) {
    console.error(error.message)
    process.exit(1)
  }
}
