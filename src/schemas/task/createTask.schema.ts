import { z } from 'zod'

import { taskSchema } from './task.schema'

export const createTaskSchema = z.object({
  body: taskSchema.omit({ completed: true, id: true }),
})

export type CreateTaskSchema = z.infer<typeof createTaskSchema>
