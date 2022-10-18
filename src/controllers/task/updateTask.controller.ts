import type { Request, Response } from 'express'
import type { UpdateTaskSchema } from '@/schemas'
import type { ResultSetHeader, RowDataPacket } from 'mysql2'

import { db } from '@/database'
import { Task } from '@/types'

type UpdateTaskResponse = { status: 'failed'; error: string } | { status: 'success'; task: Task }

export const updateTask = async (req: Request, res: Response<UpdateTaskResponse>) => {
  const { title, completed, description, userId } = req.body as UpdateTaskSchema['body']
  const { id: taskId } = req.params as UpdateTaskSchema['params']

  const [taskResult] = await db.query<Task[] & RowDataPacket[]>(
    'SELECT * FROM tasks WHERE id = ? AND user_id = ?',
    [taskId, userId],
  )

  const task = taskResult[0]

  const updatedTask = {
    title: title ?? task.title,
    description: description ?? task.description,
    completed: completed ?? task.completed,
  }

  const [updatedResult] = await db.query<ResultSetHeader>('UPDATE tasks SET ? WHERE id = ?', [
    updatedTask,
    taskId,
  ])

  if (!updatedResult.affectedRows) {
    return res.status(500).json({ status: 'failed', error: 'Internal server error' })
  }

  return res.status(200).json({ status: 'success', task: { id: +taskId, userId, ...updatedTask } })
}
