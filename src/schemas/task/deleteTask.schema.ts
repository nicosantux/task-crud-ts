import { z } from 'zod'

import { taskSchema } from './task.schema'

export const deleteTaskSchema = z.object({
  body: taskSchema.pick({ userId: true }),
  params: z.object({
    id: z.string().min(1, 'Task ID is required'),
  }),
})

export type DeleteTaskSchema = z.infer<typeof deleteTaskSchema>
