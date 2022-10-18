import { z } from 'zod'

import { loginBodySchema } from '.'

export const registerSchema = z.object({
  body: loginBodySchema.extend({
    fullName: z.string().min(2, 'The name must have at least 2 characters'),
  }),
})

export type RegisterSchema = z.infer<typeof registerSchema>
