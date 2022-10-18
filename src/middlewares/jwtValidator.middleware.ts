import type { NextFunction, Request, Response } from 'express'

import jwt from 'jsonwebtoken'

export const jwtValidator = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')!

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number }

    req.body.userId = decoded.id

    next()
  } catch (error) {
    return res.status(401).json({ status: 'failed', error: 'Invalid token' })
  }
}
