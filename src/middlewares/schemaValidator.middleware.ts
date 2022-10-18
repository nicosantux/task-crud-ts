import type { NextFunction, Request, Response } from 'express'

import { type AnyZodObject, ZodError } from 'zod'

export const schemaValidator =
  (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
        headers: req.headers,
      })
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: error.issues })
      }

      return res.status(500).json({ message: 'Internal server error' })
    }
  }
