import type { Request, Response } from 'express'
import type { LoginSchema } from 'src/schemas'

import { RowDataPacket } from 'mysql2'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { User } from '@/types'
import { db } from '@/database'

type LoginUserResponse = { status: 'success'; user: User } | { status: 'failed'; error: string }

export const loginUser = async (req: Request, res: Response<LoginUserResponse>) => {
  const { email, password } = req.body as LoginSchema['body']

  const [result] = await db.query<RowDataPacket[]>(
    'SELECT id, full_name, password FROM users WHERE email = ?',
    [email],
  )

  const user = result[0]

  if (!user) {
    return res.status(400).json({ status: 'failed', error: 'There is no user with this email' })
  }

  const match = await bcrypt.compare(password, user.password)

  if (!match) {
    return res.status(400).json({ status: 'failed', error: 'Email or password is incorrect' })
  }

  const { id, full_name: fullName } = user

  const token = jwt.sign({ id, fullName, email }, process.env.JWT_SECRET!)

  return res.status(200).json({ status: 'success', user: { id, fullName, email, token } })
}
