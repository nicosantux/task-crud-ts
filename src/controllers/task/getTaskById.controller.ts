import type { Request, Response } from 'express'
import type { RowDataPacket } from 'mysql2'
import type { GetTaskByIdSchema } from '@/schemas'
import type { Task } from '@/types'

import { db } from '@/database'

type GetTaskByIdResponse = { status: 'failed'; error: string } | { status: 'success'; task: Task }

export const getTaskById = async (req: Request, res: Response<GetTaskByIdResponse>) => {
  const { userId } = req.body as GetTaskByIdSchema['body']
  const { id: taskId } = req.params as GetTaskByIdSchema['params']

  const [results] = await db.query<RowDataPacket[]>(
    'SELECT id, title, description, completed FROM tasks WHERE id = ? AND user_id = ?',
    [taskId, userId],
  )

  if (!results[0]) {
    return res
      .status(404)
      .json({ status: 'failed', error: `There is not a task with the id ${taskId}` })
  }

  return res.status(200).json({ status: 'success', task: results[0] as Task })
}
