import { z } from 'zod'

import { taskSchema } from './task.schema'

export const getAllTaskSchema = z.object({
  body: taskSchema.pick({ userId: true }),
})

export type GetAllTaskSchema = z.infer<typeof getAllTaskSchema>
