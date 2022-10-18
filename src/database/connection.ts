import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

export const db = mysql.createPool({
  host: process.env.DB_HOST ?? '',
  user: process.env.DB_USER ?? '',
  database: process.env.DB_NAME ?? '',
  password: process.env.DB_PASSWORD ?? '',
  port: +(process.env.DB_PORT ?? 3306),
})
