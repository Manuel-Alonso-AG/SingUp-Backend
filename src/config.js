process.loadEnvFile()

const {
  SERVER_PORT = 3000,
  MONGOODB_URL = 'mongodb://localhost/DBventas',
  TOKEN_SECRET = 'secret'
} = process.env

export const port = SERVER_PORT
export const mongoodbUrl = MONGOODB_URL
export const secretToken = TOKEN_SECRET
