process.loadEnvFile()

const {
  SERVER_PORT = 3000,
  MONGOODB_URL = 'mongodb+srv://angel:manuelAlonso@cluster0.n6ys4.mongodb.net/DBventas?retryWrites=true&w=majority&appName=Cluster0',
  TOKEN_SECRET = 'secret'
} = process.env

export const port = SERVER_PORT
export const mongoodbUrl = MONGOODB_URL
export const secretToken = TOKEN_SECRET
