import type { Request, Response } from 'express'
import type { DeleteTaskSchema } from '@/schemas'
import type { ResultSetHeader } from 'mysql2'

import { db } from '@/database'

type DeleteTaskResponse =
  | { status: 'failed'; error: string }
  | { status: 'success'; message: string }

export const deleteTask = async (req: Request, res: Response<DeleteTaskResponse>) => {
  const { userId } = req.body as DeleteTaskSchema['body']
  const { id: taskId } = req.params as DeleteTaskSchema['params']

  const [result] = await db.query<ResultSetHeader>(
    'DELETE FROM tasks WHERE id = ? AND user_id = ?',
    [taskId, userId],
  )

  if (!result.affectedRows) {
    return res.status(400).json({ status: 'failed', error: `There is no task with id ${taskId}` })
  }

  return res
    .status(200)
    .json({ status: 'success', message: `The task with id ${taskId} has been deleted` })
}
