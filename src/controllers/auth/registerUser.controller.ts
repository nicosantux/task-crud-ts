import type { Request, Response } from 'express'
import type { ResultSetHeader, RowDataPacket } from 'mysql2'
import type { RegisterSchema } from 'src/schemas'
import type { User } from '@/types'

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { db } from '@/database'

type RegisterUserResponse = { status: 'failed'; error: string } | { status: 'success'; user: User }

export const registerUser = async (req: Request, res: Response<RegisterUserResponse>) => {
  const { email, fullName, password } = req.body as RegisterSchema['body']

  const [isUser] = await db.query<RowDataPacket[]>('SELECT * FROM users WHERE email = ?', [email])

  if (!!isUser.length) {
    return res
      .status(400)
      .json({ error: 'There is already a user with this email ', status: 'failed' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = { email, full_name: fullName, password: hashedPassword }

  const [result] = await db.query<ResultSetHeader>('INSERT INTO users SET ?', [newUser])

  if (!result.affectedRows) {
    return res.status(500).json({ error: 'Something went wrong', status: 'failed' })
  }

  const token = jwt.sign({ id: result.insertId, fullName, email }, process.env.JWT_SECRET!)

  return res
    .status(201)
    .json({ status: 'success', user: { id: result.insertId, fullName, email, token } })
}
