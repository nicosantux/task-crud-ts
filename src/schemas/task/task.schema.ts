import { z } from 'zod'

export const taskSchema = z.object({
  id: z.number().min(1, 'ID is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  completed: z.boolean({
    required_error: 'Completed is required',
    invalid_type_error: 'Completed must be a boolean',
  }),
  userId: z.number().min(1, 'User ID is required'),
})
