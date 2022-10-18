import { Router } from 'express'

import { loginUser, registerUser } from '@/controllers'
import { schemaValidator } from '@/middlewares'
import { loginSchema, registerSchema } from '@/schemas'

const router = Router()

router.post('/register', schemaValidator(registerSchema), registerUser)

router.post('/login', schemaValidator(loginSchema), loginUser)

export { router as authRouter }
