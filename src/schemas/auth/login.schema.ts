import { z } from 'zod'

export const loginBodySchema = z.object({
  email: z.string().min(1, 'Email is required').email('Email is invalid'),
  password: z
    .string()
    .min(8, 'Password must have at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      'The password must have at least one uppercase letter, one lowercase letter and one number.',
    ),
})

export const loginSchema = z.object({
  body: loginBodySchema,
})

export type LoginSchema = z.infer<typeof loginSchema>
