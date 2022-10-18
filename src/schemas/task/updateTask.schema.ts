import { z } from 'zod'

import { taskSchema } from '.'

const userId = taskSchema.pick({ userId: true })
const task = taskSchema.pick({ completed: true, title: true, description: true }).partial()

export const updateTaskSchema = z.object({
  body: userId.merge(task),
  params: z.object({
    id: z.string().min(1, 'Task ID is required'),
  }),
})

export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>
